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
  @computed get blockWeight() { return this.blummary.blockcount.reduce<number>((sum, value, key)=>sum+this.blocks.get(key).weight, 0)}
  @computed get blockTime() { return this.blummary.blockcount.reduce<number>((sum, value, key)=>sum+this.blocks.get(key).time, 0)}

}

export interface AnalysisRowProps {
  analysis: Analysis
}
