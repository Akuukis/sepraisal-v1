import {Material, MaterialDTO} from "./";
import { parseString } from 'xml2js';

export interface BlockDTO extends MaterialDTO {
  type: string;
  subtype: string;
  weight: number;
  time?: number;
  prerequisites?: {
    [title: string]: number,
  }  
}

export class Block extends Material {

  static async parseXml(xml: string): Promise<Block[]> {
    return new Promise( (resolve: (value: Block[])=>void, reject: (reason: Error)=>void) => {
      parseString(xml, (parseError: Error, bp: BlockDefinition) => {
        if(parseError) reject(parseError);
        try {
          const blockDtos: BlockDTO[] = [];
          bp.Definitions.CubeBlocks[0].Definition
            .forEach((block)=>{
              if(!block.BuildTimeSeconds) return;
              blockDtos.push({
                type: block.Id[0].TypeId[0],
                subtype: block.Id[0].SubtypeId[0],
                weight: 0,
                time: block.BuildTimeSeconds[0],
                prerequisites: {},
              });
            });
          const blocks = blockDtos.map((blockDto)=>new Block(blockDto)); 
          resolve(blocks);
        } catch(transformError) {
          console.error(transformError, bp)
          reject(transformError);
        };
      });
    });
  };

}
