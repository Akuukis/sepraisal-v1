import {Material, MaterialDTO} from "./";
import {parseBlueprintSbc} from "../common/";

export interface IngotDTO extends MaterialDTO {
  type: string;
  subtype: string;
  mass: number;
  time?: number;
  prerequisites?: {
    [title: string]: number,
  }  
}

export class Ingot extends Material {

  static async parseXml(xml: string): Promise<Ingot[]> {
    const componentDtos = await parseBlueprintSbc(xml, 'Ingot');
    return componentDtos.map((blockDto)=>new Ingot(blockDto)); 
  };

}
