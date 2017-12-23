import {Ore} from './../models/';
import {MaterialStore} from './';

import * as PhysicalItems from '../../../vendor/SpaceEngineers/PhysicalItems.sbc';

export class OreStore extends MaterialStore<Ore> {

  async reset() {
    const ores = await Ore.parseXml(PhysicalItems);
    this.replace(ores.map((ore)=>[ore.title, ore]));
  }

}
