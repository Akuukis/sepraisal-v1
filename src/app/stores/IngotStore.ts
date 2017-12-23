import {Ingot} from './../models/';
import {MaterialStore} from './';

import * as Materials from '../../../vendor/SpaceEngineers/Blueprints.sbc';
import * as PhysicalItems from '../../../vendor/SpaceEngineers/PhysicalItems.sbc';

export class IngotStore extends MaterialStore<Ingot> {

  async reset() {
    const ingots = await Ingot.parseXml(Materials, PhysicalItems);
    this.replace(ingots.map((ingot)=>[ingot.title, ingot]));
  }

}
