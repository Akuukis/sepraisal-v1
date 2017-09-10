import {Ingot} from './../models/';
import {MaterialStore} from './';

import * as Materials from '../../../vendor/SpaceEngineers/Blueprints.sbc';

export class IngotStore extends MaterialStore<Ingot> {

  async reset() {
    const ingots = (await Ingot.parseXml(Materials))
      // Remove duplicate Ingot definitions for Iron and Stone.
      .filter((ingot)=>!('Ingot/Scrap' in ingot.prerequisites))
      .filter((ingot)=>!('Ore/Scrap' in ingot.prerequisites))
      .filter((ingot)=>!('OxygenContainerObject/OxygenBottle' in ingot.prerequisites))
      .filter((ingot)=>!('GasContainerObject/HydrogenBottle' in ingot.prerequisites))
    this.replace(ingots.map((ingot)=>[ingot.title, ingot]));
  }

}
