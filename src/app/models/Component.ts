import {Material, MaterialDTO} from "./";
import { parseString } from 'xml2js';

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
    return new Promise( (resolve: (value: Component[])=>void, reject: (reason: Error)=>void) => {
      parseString(xml, (parseError: Error, bp: MaterialDefinition) => {
        if(parseError) reject(parseError);
        try {
          const blockDtos = bp.Definitions.Blueprints[0].Blueprint
            .filter((material)=>material.Result[0].$.TypeId=='Component')
            .map((material)=>{
              const prerequisites = material.Prerequisites[0].Item.reduce((req, item)=>{
                  const title = `Component/${item.$.SubtypeId}`;
                  req[title] = Number(item.$.Amount) + (title in req ? Number(req[title]) : 0);
                  return req;
                }, Object.create(null));
              return {
                type: material.Result[0].$.TypeId,
                subtype: material.Result[0].$.SubtypeId,
                weight: 0,
                time: Number(material.BaseProductionTimeInSeconds[0]),
                prerequisites,
              };
            });
          const blocks = blockDtos.map((blockDto)=>new Component(blockDto)); 
          resolve(blocks);
        } catch(transformError) {
          console.error(transformError, bp)
          reject(transformError);
        };
      });
    });
  };

}
