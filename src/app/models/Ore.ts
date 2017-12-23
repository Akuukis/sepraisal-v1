import {Material, MaterialDTO} from "./";
import {parsePhysicalItemsSbc} from "../common/";

export interface OreDTO extends MaterialDTO {
  type: string;
  subtype: string;
  mass: number;
  volume: number;
  time?: number;
  prerequisites?: {
    [title: string]: number,
  }  
}

export class Ore extends Material {

  static async parseXml(physicalItemsXml: string): Promise<Ore[]> {
    const oreDtos = await parsePhysicalItemsSbc(physicalItemsXml, 'Ore');
    return oreDtos.map((blockDto)=>new Ore(blockDto)); 
  };

}
