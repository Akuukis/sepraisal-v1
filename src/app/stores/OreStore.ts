import {Ore} from './../models/';
import {MaterialStore} from './';

import * as Materials from '../../../vendor/SpaceEngineers/Blueprints.sbc';

export class OreStore extends MaterialStore<Ore> {

  async reset() {
    const ores = await Ore.parseXml(Materials);
    this.replace(ores.map((ore)=>[ore.title, ore]));
  }

}
