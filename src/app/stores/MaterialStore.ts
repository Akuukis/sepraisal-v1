import {action} from "mobx";

import {ObservableMap} from './../common/';
import { Material } from './../models/';

export abstract class MaterialStore<TMaterial extends Material> extends ObservableMap<TMaterial> {

  @action add(material: TMaterial): void {
    this.set(material.title, material);
  };

}
