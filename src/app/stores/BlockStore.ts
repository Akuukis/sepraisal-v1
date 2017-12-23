import {Block} from './../models/';
import {MaterialStore, ComponentStore} from './';

import * as CubeBlocks from '../../../vendor/SpaceEngineers/CubeBlocks.sbc';

export class BlockStore extends MaterialStore<Block> {

  constructor(
    private componentStore: ComponentStore
  ) {
    super();
  }

  async reset() {
    const blocks = await Block.parseXml(CubeBlocks, this.componentStore);
    this.replace(blocks.map((block)=>[block.title, block]));
  }

}
