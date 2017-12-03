import {Material, MaterialDTO} from "./";
import { parseString } from 'xml2js';

export interface BlockDTO extends MaterialDTO {
  type: string;
  subtype: string;
  mass: number;
  time: number;
  prerequisites: {
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
              const prerequisites = block.Components[0].Component.reduce((req, comp)=>{
                  const title = `Component/${comp.$.Subtype}`;
                  req[title] = Number(comp.$.Count) + (title in req ? Number(req[title]) : 0);
                  return req;
                }, Object.create(null));
              blockDtos.push({
                type: block.Id[0].TypeId[0],
                subtype: block.Id[0].SubtypeId[0],
                mass: 0,
                time: Number(block.BuildTimeSeconds[0]),
                prerequisites,
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
