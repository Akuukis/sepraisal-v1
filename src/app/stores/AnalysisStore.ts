import {action} from "mobx";

import {ObservableMap} from './../common/';
import {Analysis, Blummary} from './../models/';
import {BlockStore, ComponentStore, IngotStore, OreStore} from "./";

export class AnalysisStore extends ObservableMap<Analysis> {
  readonly blockStore: BlockStore;
  readonly componentStore: ComponentStore;
  readonly ingotStore: IngotStore;
  readonly oreStore: OreStore;

  constructor(blockStore: BlockStore, componentStore: ComponentStore, ingotStore: IngotStore, oreStore: OreStore) {
    super();
    this.blockStore = blockStore;
    this.componentStore = componentStore;
    this.ingotStore = ingotStore;
    this.oreStore = oreStore;
  }

  @action add(blummary: Blummary): void {
    this.set(blummary.title, new Analysis(blummary, this.blockStore, this.componentStore, this.ingotStore, this.oreStore))
  }

}
