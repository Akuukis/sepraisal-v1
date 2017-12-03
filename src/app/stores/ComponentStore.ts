import {Component} from './../models/';
import {MaterialStore} from './';

import * as Materials from '../../../vendor/SpaceEngineers/Blueprints.sbc';
import * as Components from '../../../vendor/SpaceEngineers/Components.sbc';

export class ComponentStore extends MaterialStore<Component> {

  async reset() {
    const components = await Component.parseXml(Materials, Components);
    this.replace(components.map((component)=>[component.title, component]));
  }

}
