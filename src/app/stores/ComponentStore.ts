import {Component} from './../models/';
import {MaterialStore} from './';

import * as Materials from '../../../vendor/SpaceEngineers/Blueprints.sbc';

export class ComponentStore extends MaterialStore<Component> {

  async reset() {
    const components = await Component.parseXml(Materials);
    this.replace(components.map((component)=>[component.title, component]));
  }

}
