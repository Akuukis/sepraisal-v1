import { parseString } from 'xml2js';

import { MaterialDTO } from './../models/Material';
import { IngotDTO } from '../models/Ingot';
import { ComponentDTO } from '../models/Component';

export async function parseBlueprintSbc(xml: string, filter: 'Component'): Promise<ComponentDTO[]>
export async function parseBlueprintSbc(xml: string, filter: 'Ingot'): Promise<IngotDTO[]>
export async function parseBlueprintSbc(xml, filter) {
    return new Promise( (resolve: (value: MaterialDTO[])=>void, reject: (reason: Error)=>void) => {
      parseString(xml, (parseError: Error, bp: MaterialDefinition) => {
        if(parseError) reject(parseError);
        try {
          const blockDtos = bp.Definitions.Blueprints[0].Blueprint
          // as of 1.189/1.190 not all materials have a Result. (bottle refills are the prime example)
            .filter((material)=>"Result" in material)
            .filter((material)=>material.Result[0].$.TypeId==filter)
            .map((material)=>({
                type: material.Result[0].$.TypeId,
                subtype: material.Result[0].$.SubtypeId,
                time: Number(material.BaseProductionTimeInSeconds[0]),
                prerequisites: material.Prerequisites[0].Item.reduce((req, item)=>{
                  const title = `${item.$.TypeId}/${item.$.SubtypeId}`;
                  req[title] = Number(item.$.Amount) / Number(material.Result[0].$.Amount);
                  return req;
                }, Object.create(null)),
              }));
          resolve(blockDtos);
        } catch(transformError) {
          console.error(transformError, bp, filter)
          reject(transformError);
        };
      });
    });
  }
