import {Ingot} from './../models/';
import {MaterialStore} from './';

import * as Materials from '../../../vendor/SpaceEngineers/Blueprints.sbc';

export class IngotStore extends MaterialStore<Ingot> {

  async reset() {
    const components = await Ingot.parseXml(Materials);
    console.log(components)
    this.replace(components.map((component)=>[component.title, component]));
  }

}
