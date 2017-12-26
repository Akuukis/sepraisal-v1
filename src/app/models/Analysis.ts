import {action, computed, observable} from 'mobx';
import { parseString } from 'xml2js';

import {BlockStore, ComponentStore, IngotStore, OreStore} from './../stores/';
import {Blummary, Block, Component, Ingot, Ore, Material} from './';
import { ObservableMap } from '../common/ObservableMap';
import { MaterialStore } from '../stores/MaterialStore';

export class Analysis {

  constructor(
    public readonly blummary: Blummary,
    public readonly blockStore: BlockStore,
    public readonly componentStore: ComponentStore,
    public readonly ingotStore: IngotStore,
    public readonly oreStore: OreStore
  ) {
  }

  // @computed.struct get blocksAll(): {[blockName: string]: number} {
  //   const struct = Object.create(null);
  //   [...this.blummary.blockcount.entries()]
  //     .filter(([blockName, count])=>this.blockStore.has(blockName))
  //     .forEach(([blockName, count])=>struct[blockName] = count);
  //   return struct;
  // }

  private getMaterialAll(outerEntries: [Material, number][], innerStore: MaterialStore<any>): {[name: string]: number} {
    const struct = Object.create(null);
    for(let [material, outerCount] of outerEntries) {
      for(let [innerName, innerCount] of Object.entries(material.prerequisites)) {
        struct[innerName] = (struct[innerName]||0) + outerCount * innerCount;
      }
    }
    return struct;
  }

  @computed.struct private get blockAll() { return this.blummary.blockcount.entries()
    .reduce((struct, [name, count])=>{struct[name]=count; return struct}, Object.create(null)); }
  @computed.struct private get componentAll() { return this.getMaterialAll(this.blocks, this.blockStore); }
  @computed.struct private get ingotAll() { return this.getMaterialAll(this.components, this.componentStore); }
  @computed.struct private get oreAll() { return this.getMaterialAll(this.ingots, this.ingotStore); }

  private getMaterials(struct: {[name: string]: number}, store: MaterialStore<any>): {[blockName: string]: number} {
    const result = Object.create(null);
    for(let [name, count] of Object.entries(struct)) {
      if(store.has(name)) result[name] = count;
    }
    return result;
  }

  private getMaterialsError(struct: {[name: string]: number}, store: MaterialStore<any>): {[blockName: string]: number} {
    const result = Object.create(null);
    for(let [name, count] of Object.entries(struct)) {
      if(!store.has(name)) result[name] = count;
    }
    return result;
  }

  @computed.struct private get blockStruct() { return this.getMaterials(this.blockAll, this.blockStore); }
  @computed.struct private get componentStruct() { return this.getMaterials(this.componentAll, this.componentStore); }
  @computed.struct private get ingotStruct() { return this.getMaterials(this.ingotAll, this.ingotStore); }
  @computed.struct private get oreStruct() { return this.getMaterials(this.oreAll, this.oreStore); }

  @computed.struct private get blockErrorsStruct() { return this.getMaterialsError(this.blockAll, this.blockStore); }
  @computed.struct private get componentErrorsStruct() { return this.getMaterialsError(this.componentAll, this.componentStore); }
  @computed.struct private get ingotErrorsStruct() { return this.getMaterialsError(this.ingotAll, this.ingotStore); }
  @computed.struct private get oreErrorsStruct() { return this.getMaterialsError(this.oreAll, this.oreStore); }

  @computed get blocks()     { return Object.entries(this.blockStruct    ).map<[Block    , number]>(([name, count])=>[this.blockStore.get(name)    , count]); }
  @computed get components() { return Object.entries(this.componentStruct).map<[Component, number]>(([name, count])=>[this.componentStore.get(name), count]); }
  @computed get ingots()     { return Object.entries(this.ingotStruct    ).map<[Ingot    , number]>(([name, count])=>[this.ingotStore.get(name)    , count]); }
  @computed get ores()       { return Object.entries(this.oreStruct      ).map<[Ore      , number]>(([name, count])=>[this.oreStore.get(name)      , count]); }

  @computed get blocksErrors() { return Object.entries(this.blockErrorsStruct); }
  @computed get componentErrors() { return Object.entries(this.componentErrorsStruct); }
  @computed get ingotErrors() { return Object.entries(this.ingotErrorsStruct); }
  @computed get oreErrors() { return Object.entries(this.oreErrorsStruct); }

  @computed get blockCount() { return this.blocks.reduce((sum, [material, count])=>sum+count, 0)}
  @computed get blockTime() { return this.blocks.reduce((sum, [material, count])=>sum+material.time*count, 0)}
  @computed get blockMass() { return this.blocks.reduce((sum, [material, count])=>sum+material.mass*count, 0)}

  @computed get componentCount() { return this.components.reduce((sum, [material, count])=>sum+count, 0)}
  @computed get componentTime() { return this.components.reduce((sum, [material, count])=>sum+material.time*count, 0)}
  @computed get componentMass() { return this.components.reduce((sum, [material, count])=>sum+material.mass*count, 0)}

  @computed get ingotCount() { return this.ingots.reduce((sum, [material, count])=>sum+count, 0)}
  @computed get ingotTime() { return this.ingots.reduce((sum, [material, count])=>sum+material.time*count, 0)}
  @computed get ingotMass() { return this.ingots.reduce((sum, [material, count])=>sum+material.mass*count, 0)}

  @computed get oreCount() { return this.ores.reduce((sum, [material, count])=>sum+count, 0)}
  @computed get oreTime() { return this.ores.reduce((sum, [material, count])=>sum+material.time*count, 0)}
  @computed get oreMass() { return this.ores.reduce((sum, [material, count])=>sum+material.mass*count, 0)}


}

export interface AnalysisRowProps {
  analysis: Analysis
}
