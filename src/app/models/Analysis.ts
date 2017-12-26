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
  @computed.struct private get componentAll() { return this.getMaterialAll(this.blockEntries, this.blockStore); }
  @computed.struct private get ingotAll() { return this.getMaterialAll(this.componentEntries, this.componentStore); }
  @computed.struct private get oreAll() { return this.getMaterialAll(this.ingotEntries, this.ingotStore); }

  private getMaterials(struct: {[name: string]: number}, store: MaterialStore<any>): {[blockName: string]: number} {
    const result = Object.create(null);
    for(let [name, count] of Object.entries(struct)) {
      if(store.has(name)) result[name] = count;
    }
    return result;
  }

  @computed.struct get blocks() { return this.getMaterials(this.blockAll, this.blockStore); }
  @computed.struct get components() { return this.getMaterials(this.componentAll, this.componentStore); }
  @computed.struct get ingots() { return this.getMaterials(this.ingotAll, this.ingotStore); }
  @computed.struct get ores() { return this.getMaterials(this.oreAll, this.oreStore); }

  @computed get blockEntries()     { return Object.entries(this.blocks    ).map<[Block    , number]>(([name, count])=>[this.blockStore.get(name)    , count]); }
  @computed get componentEntries() { return Object.entries(this.components).map<[Component, number]>(([name, count])=>[this.componentStore.get(name), count]); }
  @computed get ingotEntries()     { return Object.entries(this.ingots    ).map<[Ingot    , number]>(([name, count])=>[this.ingotStore.get(name)    , count]); }
  @computed get oreEntries()       { return Object.entries(this.ores      ).map<[Ore      , number]>(([name, count])=>[this.oreStore.get(name)      , count]); }

  @computed get blockCount() { return this.blockEntries.reduce((sum, [material, count])=>sum+count, 0)}
  @computed get blockTime() { return this.blockEntries.reduce((sum, [material, count])=>sum+material.time*count, 0)}
  @computed get blockMass() { return this.blockEntries.reduce((sum, [material, count])=>sum+material.mass*count, 0)}

  @computed get componentCount() { return this.componentEntries.reduce((sum, [material, count])=>sum+count, 0)}
  @computed get componentTime() { return this.componentEntries.reduce((sum, [material, count])=>sum+material.time*count, 0)}
  @computed get componentMass() { return this.componentEntries.reduce((sum, [material, count])=>sum+material.mass*count, 0)}

  @computed get ingotCount() { return this.ingotEntries.reduce((sum, [material, count])=>sum+count, 0)}
  @computed get ingotTime() { return this.ingotEntries.reduce((sum, [material, count])=>sum+material.time*count, 0)}
  @computed get ingotMass() { return this.ingotEntries.reduce((sum, [material, count])=>sum+material.mass*count, 0)}

  @computed get oreCount() { return this.oreEntries.reduce((sum, [material, count])=>sum+count, 0)}
  @computed get oreTime() { return this.oreEntries.reduce((sum, [material, count])=>sum+material.time*count, 0)}
  @computed get oreMass() { return this.oreEntries.reduce((sum, [material, count])=>sum+material.mass*count, 0)}


}

export interface AnalysisRowProps {
  analysis: Analysis
}
