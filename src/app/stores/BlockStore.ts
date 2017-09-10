import {Block} from './../models/';
import {MaterialStore} from './';

import * as CubeBlocks from '../../../vendor/SpaceEngineers/CubeBlocks.sbc';

export class BlockStore extends MaterialStore<Block> {

  async reset() {
    const blocks = await Block.parseXml(CubeBlocks);
    console.log(blocks)
    this.replace(blocks.map((block)=>[block.title, block]));
  }

}
