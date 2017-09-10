import {Material, MaterialDTO} from "./";
import {parseBlueprintSbc} from "../common/";

export interface ComponentDTO extends MaterialDTO {
  type: string;
  subtype: string;
  weight: number;
  time?: number;
  prerequisites?: {
    [title: string]: number,
  }  
}

export class Component extends Material {

  static async parseXml(xml: string): Promise<Component[]> {
    const componentDtos = await parseBlueprintSbc(xml, 'Component');
    return componentDtos.map((blockDto)=>new Component(blockDto)); 
  };

}
