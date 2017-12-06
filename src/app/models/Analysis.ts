import {action, computed, observable} from 'mobx';
import { parseString } from 'xml2js';

import {BlockStore, ComponentStore, IngotStore, OreStore} from './../stores/';
import {Blummary, Block, Component, Ingot, Ore} from './';

export class Analysis {

  public blummary: Blummary;
  public blocks: BlockStore;
  public components: ComponentStore;
  public ingots: IngotStore;
  public ores: OreStore;

  constructor(blummary: Blummary, blocks: BlockStore, components: ComponentStore, ingots: IngotStore, ores: OreStore) {
    this.blummary = blummary;
    this.blocks = blocks;
    this.components = components;
    this.ingots = ingots;
    this.ores = ores;
  }

  @computed get blockCount() { return this.blummary.count; }
  @computed get blockWeight() { return this.blummary.blockcount.reduce<number>((sum, value, key)=>sum+this.blocks.get(key).mass, 0)}
  @computed get blockTime() { return this.blummary.blockcount.reduce<number>((sum, value, key)=>sum+this.blocks.get(key).time, 0)}

  @computed get componentCount() { return this.blummary.blockcount.reduce<{[title: string]: number}>((components, count, blockTitle)=>{
      const { prerequisites } = this.blocks.get(blockTitle);
      for(let [title, required] of Object.entries(prerequisites)) {
        components[title] = count * required + (title in components ? components[title] : 0);
      }
      return components;
    }, Object.create(null));
  }

  @computed get ingotCount() { return Object.keys(this.componentCount).reduce<{[title: string]: number}>((ingots, compTitle)=>{
      const { prerequisites } = this.components.get(compTitle);
      for(let [title, required] of Object.entries(prerequisites)) {
        ingots[title] = this.componentCount[compTitle] * required + (title in ingots ? ingots[title] : 0);
      }
      return ingots;
    }, Object.create(null));
  }

  @computed get oreCount() { return Object.keys(this.ingotCount).reduce<{[title: string]: number}>((ores, ingotTitle)=>{
      const { prerequisites } = this.ingots.get(ingotTitle);
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
