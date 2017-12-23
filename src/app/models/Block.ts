import {Material, MaterialDTO} from "./";
import { parseBlockSbc } from "../common/parseBlockSbc";
import { ComponentStore } from "../stores/ComponentStore";

export interface BlockDTO extends MaterialDTO {
  type: string;
  subtype: string;
  time: number;
  size: {X: number, Y: number, Z: number};
  prerequisites: {
    [title: string]: number,
  }  
}

export class Block extends Material {
  componentStore: ComponentStore;
  size: {X: number, Y: number, Z: number};

  constructor(blockDto: BlockDTO, componentStore: ComponentStore) {
    super(blockDto);
    this.size = blockDto.size;
    this.componentStore = componentStore;
  }

  get mass() {
    const mass = Object.keys(this.prerequisites).reduce((sum, typeSubtype)=>{
        const component = this.componentStore.get(typeSubtype);
        return component.mass * this.prerequisites[typeSubtype];
      }, 0)
    return mass;
  }

  get volume() {
    return (2.5 * this.size.X) * (2.5 * this.size.Y) * (2.5 * this.size.Z);
  }

  static async parseXml(xml: string, componentStore: ComponentStore): Promise<Block[]> {
    const blockDtos = await parseBlockSbc(xml);
    return blockDtos.map((blockDto)=>new Block(blockDto, componentStore));
  };

}
