import {Material, MaterialDTO} from "./";
import {parseOreBlueprintSbc} from "../common/";

export interface OreDTO extends MaterialDTO {
  type: string;
  subtype: string;
  mass: number;
  time?: number;
  prerequisites?: {
    [title: string]: number,
  }  
}

export class Ore extends Material {

  static async parseXml(xml: string): Promise<Ore[]> {
    const oreDtos = await parseOreBlueprintSbc(xml);
    return oreDtos.map((blockDto)=>new Ore(blockDto)); 
  };

}
