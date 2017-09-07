import {action, computed, observable} from 'mobx';
import { parseString } from 'xml2js';

import {ObservableMap} from './../common/';

export interface BlummaryDTO {
  title: string,
  blockcount: { [typeSlashsubtype: string]: number },
}

export class Blummary {
  readonly raw: BlummaryDTO;
  @observable title: string;
  blockcount: ObservableMap<number>;

  constructor(raw?: BlummaryDTO) {
    this.raw = raw || { title: 'New blueprint', blockcount: {} };
    this.title = raw.title;
    const obj2mapArray = (obj) => Object.keys(obj).map<[string, number]>( (key)=>[key, obj[key]]);
    this.blockcount = new ObservableMap<number>( obj2mapArray(raw.blockcount) );
  }

  // Static methods for parsing input before construction.
  private static isPrefab(def: BlueprintPrefabDefinitions | BlueprintShipDefinitions): def is BlueprintPrefabDefinitions {
    return (<BlueprintPrefabDefinitions>def).Prefabs !== undefined;
  }

  private static parseBlueprint(title: string, cubeGrids: BlueprintCubeGrid[]) {
    const blummary: BlummaryDTO = {
      title,
      blockcount: {},
    }
    cubeGrids
      .reduce( (aggr: BlueprintCubeBlock[], cubeGrid: BlueprintCubeGrid) => aggr.concat(cubeGrid.CubeBlocks[0].MyObjectBuilder_CubeBlock), [] )
      .map( (cubeBlock: BlueprintCubeBlock) => `${cubeBlock.$['xsi:type'].substr('MyObjectBuilder_'.length)}/${cubeBlock.SubtypeName[0]}` )
      .forEach( (block) => blummary.blockcount[block] ? blummary.blockcount[block]++ : blummary.blockcount[block] = 1 );
    return blummary;
  }

  static parsePrefabBlueprint(def: BlueprintPrefabDefinitions) {
    const blueprint = def.Prefabs[0].Prefab[0];
    return this.parseBlueprint(blueprint.Id[0].SubtypeId[0], blueprint.CubeGrids[0].CubeGrid)
  }

  static parseShipBlueprint(def: BlueprintShipDefinitions) {
    const blueprint = def.ShipBlueprints[0].ShipBlueprint[0];
    return this.parseBlueprint(blueprint.Id[0].$.Subtype, blueprint.CubeGrids[0].CubeGrid)
  }

  static async parseBlueprintXml(xml: string): Promise<BlummaryDTO> {
    return new Promise( (resolve: (value: BlummaryDTO)=>void, reject: (reason: Error)=>void) => {
      parseString(xml, (parseError: Error, bp: BlueprintShipDefinition|BlueprintPrefabBlueprintDefinition) => {
        if(parseError) reject(parseError);
        const def = bp.Definitions;
        try {
          resolve(this.isPrefab(def) ? this.parsePrefabBlueprint(def): this.parseShipBlueprint(def));
        } catch(transformError) {
          console.log(transformError, bp)
          reject(transformError);
        };
      });
    });
  }


  // Methods for manipulating Blummary.
  reset(raw = this.raw): void {
    this.title = raw.title;
    const obj2mapArray = (obj) => Object.keys(obj).map<[string, number]>( (key)=>[key, obj[key]]);
    this.blockcount = new ObservableMap<number>( obj2mapArray(raw.blockcount) );
  }

  export(): BlummaryDTO {
    return {
      title: this.title,
      blockcount: this.blockcount.toJSON()
    }
  }

  save(): void {
    this.reset(this.export());
  }


  // Methods for analysis.
  @computed get count(): number { return this.blockcount.reduce<number>((sum, count)=>sum+count, 0); }

}