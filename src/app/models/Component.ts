import {Material, MaterialDTO} from "./";
import {parseBlueprintSbc} from "../common/";
import { parseComponentSbc } from "../common/parseComponentSbc";

export interface ComponentDTO extends MaterialDTO {
  displayName: string;
  health: number;
  mass: number;
  maxIntegrity: number;
  prerequisites?: Record<string, number>,
  size: {X: number, Y: number, Z: number};
  subtype: string;
  time?: number;
  type: string;
  volume: number;
}

export class Component extends Material implements ComponentDTO {
  readonly displayName: string;
  readonly health: number;
  readonly maxIntegrity: number;
  readonly size: {X: number, Y: number, Z: number};
  readonly volume: number; // litres.

  constructor(dto: ComponentDTO) {
    super(dto);
    this.displayName = dto.displayName;
    this.health = dto.health;
    this.maxIntegrity = dto.maxIntegrity;
    this.size = dto.size;
  }

  static async parseXml(materialXml: string, componentXml: string): Promise<Component[]> {
    const componentDtos = await parseBlueprintSbc(materialXml, 'Component');
    const componentMap = new Map(componentDtos.map<[string, Partial<ComponentDTO>]>((v)=>[v.subtype, v]));

    const comp2 = await parseComponentSbc(componentXml);
    comp2.forEach((comp2)=>{
      const comp = componentMap.get(comp2.subtype);
      comp.displayName = comp2.displayName;
      comp.health = comp2.health;
      comp.maxIntegrity = comp2.maxIntegrity;
      comp.mass = comp2.mass;
      comp.size = comp2.size;
      comp.subtype = comp2.subtype;
      comp.type = comp2.type;
      comp.volume = comp2.volume;
    });

    return ([...componentMap.values()] as ComponentDTO[]).map((blockDto)=>new Component(blockDto)); 
  };

}
