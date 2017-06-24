import { parseString } from 'xml2js';

export interface BlummaryDTO {
  title: string,
  blockcount: { [typeSlashsubtype: string]: number },
}

export class Blummary {
  readonly raw: BlummaryDTO;

  constructor(raw?: BlummaryDTO) {
    this.raw = raw || { title: 'New blueprint', blockcount: {} };
  }

  private static isPrefab(def: PrefabDefinitions | ShipDefinitions): def is PrefabDefinitions {
    return (<PrefabDefinitions>def).Prefabs !== undefined;
  }

  private static parseBlueprint(title: string, cubeGrids: CubeGrid[]) {
    const blummary: BlummaryDTO = {
      title,
      blockcount: {},
    }
    cubeGrids
      .reduce( (aggr: CubeBlock[], cubeGrid: CubeGrid) => aggr.concat(cubeGrid.CubeBlocks[0].MyObjectBuilder_CubeBlock), [] )
      .map( (cubeBlock: CubeBlock) => `${cubeBlock.$['xsi:type'].substr('MyObjectBuilder_'.length)}/${cubeBlock.SubtypeName[0]}` )
      .forEach( (block) => blummary.blockcount[block] ? blummary.blockcount[block]++ : blummary.blockcount[block] = 1 );
    return blummary;
  }

  static parsePrefabBlueprint(def: PrefabDefinitions) {
    const blueprint = def.Prefabs[0].Prefab[0];
    return this.parseBlueprint(blueprint.Id[0].SubtypeId[0], blueprint.CubeGrids[0].CubeGrid)
  }

  static parseShipBlueprint(def: ShipDefinitions) {
    const blueprint = def.ShipBlueprints[0].ShipBlueprint[0];
    return this.parseBlueprint(blueprint.Id[0].$.Subtype, blueprint.CubeGrids[0].CubeGrid)
  }

  static async parseBlueprintXml(xml: string): Promise<BlummaryDTO> {
    return new Promise( (resolve: (value: BlummaryDTO)=>void, reject: (reason: Error)=>void) => {
      parseString(xml, (parseError: Error, bp: ShipBlueprintDefinition|PrefabBlueprintDefinition) => {
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

}