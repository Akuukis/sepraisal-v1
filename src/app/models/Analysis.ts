import {action, computed, observable} from 'mobx';
import { parseString } from 'xml2js';

import {BlockStore, ComponentStore, IngotStore, OreStore} from './../stores/';
import {Blummary, Block, Component, Ingot, Ore} from './';

export class Analysis {

  constructor(
    public readonly blummary: Blummary,
    public readonly blockStore: BlockStore,
    public readonly componentStore: ComponentStore,
    public readonly ingotStore: IngotStore,
    public readonly oreStore: OreStore
  ) {
  }

  @computed get blockCount() { return this.blummary.count; }
  @computed get blockTime() { return this.blummary.blockcount.reduce<number>((sum, value, key)=>sum+value*this.blockStore.get(key).time, 0)}
  @computed get blockMass() { return this.blummary.blockcount.reduce<number>((sum, value, key)=>sum+value*this.blockStore.get(key).mass, 0)}
  @computed get componentMass() { return Object.keys(this.componentCount).reduce((sum, title)=>{
      const count = this.componentCount[title];
      const { mass } = this.componentStore.get(title);
      return sum + mass * count;
    }, 0)
  }
  @computed get ingotMass() { return Object.keys(this.ingotCount).reduce((sum, title)=>{
      const count = this.ingotCount[title];
      const { mass } = this.ingotStore.get(title);
      return sum + mass * count;
    }, 0)
  }
  @computed get oreMass() { return Object.keys(this.oreCount).reduce((sum, title)=>{
      const count = this.oreCount[title];
      const { mass } = this.oreStore.get(title);
      return sum + mass * count;
    }, 0)
  }

  @computed get componentCount() { return this.blummary.blockcount.reduce<{[title: string]: number}>((components, count, blockTitle)=>{
      const block = this.blockStore.get(blockTitle);
      if(!block) return components;

      for(let [title, required] of Object.entries(block.prerequisites)) {
        components[title] = count * required + (title in components ? components[title] : 0);
      }
      return components;
    }, Object.create(null));
  }

  @computed get ingotCount() { return Object.keys(this.componentCount).reduce<{[title: string]: number}>((ingots, compTitle)=>{
      const { prerequisites } = this.componentStore.get(compTitle);
      for(let [title, required] of Object.entries(prerequisites)) {
        ingots[title] = this.componentCount[compTitle] * required + (title in ingots ? ingots[title] : 0);
      }
      return ingots;
    }, Object.create(null));
  }

  @computed get oreCount() { return Object.keys(this.ingotCount).reduce<{[title: string]: number}>((ores, ingotTitle)=>{
      const { prerequisites } = this.ingotStore.get(ingotTitle);
      for(let [title, required] of Object.entries(prerequisites)) {
        ores[title] = this.ingotCount[ingotTitle] * required + (title in ores ? ores[title] : 0);
      }
      return ores;
    }, Object.create(null));
  }

}

export interface AnalysisRowProps {
  analysis: Analysis
}
