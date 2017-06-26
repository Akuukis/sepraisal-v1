import {action, computed, observable} from 'mobx';
import { parseString } from 'xml2js';

import {Blummary, Block, Component, Ingot, Ore} from './';
import {ObservableMap} from './../common/';

export class Analysis {

  blummary: Blummary;
  blocks: ObservableMap<Block>;
  components: ObservableMap<Component>;
  ingots: ObservableMap<Ingot>;
  ores: ObservableMap<Ore>;

  constructor(blummary: Blummary, blocks: ObservableMap<Block>, components: ObservableMap<Component>, ingots: ObservableMap<Ingot>, ores: ObservableMap<Ore>) {
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