import {Ingot} from './../models/';
import {MaterialStore} from './';

import * as Materials from '../../../vendor/SpaceEngineers/Blueprints.sbc';

export class IngotStore extends MaterialStore<Ingot> {

  async reset() {
    const ingots = await Ingot.parseXml(Materials);
    console.log(ingots)
    this.replace(ingots.map((ingot)=>[ingot.title, ingot]));
  }

}
