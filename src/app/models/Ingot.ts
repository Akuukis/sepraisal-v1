import {Material, MaterialDTO} from "./";
import {parseBlueprintSbc, parsePhysicalItemsSbc} from "../common/";

export interface IngotDTO extends MaterialDTO {
  type: string;
  subtype: string;
  volume: number;
  mass: number;
  time?: number;
  prerequisites?: {
    [title: string]: number,
  }  
}

export class Ingot extends Material {

  static async parseXml(blueprintXml: string, physicalItemsXml: string): Promise<Ingot[]> {
    const ingotDtos1 = await parseBlueprintSbc(blueprintXml, 'Ingot');
    const ingotDtos2 = await parsePhysicalItemsSbc(physicalItemsXml, 'Ingot');
    return ingotDtos2
      .filter((ingotDto)=>ingotDto.subtype!=='Scrap')
      .map((ingotDto)=> {
        ingotDto.prerequisites = ingotDtos1.find((v)=>v.subtype===ingotDto.subtype).prerequisites;
        return ingotDto;
      })
      .map((ingotDto)=>new Ingot(ingotDto)); 
  };

}
