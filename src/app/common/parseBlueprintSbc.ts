import { parseString } from 'xml2js';

import { MaterialDTO } from './../models/Material';

export async function parseBlueprintSbc(xml: string, filter: string) {
    return new Promise( (resolve: (value: MaterialDTO[])=>void, reject: (reason: Error)=>void) => {
      parseString(xml, (parseError: Error, bp: MaterialDefinition) => {
        if(parseError) reject(parseError);
        try {
          const blockDtos = bp.Definitions.Blueprints[0].Blueprint
            .filter((material)=>material.Result[0].$.TypeId==filter)
            .map((material)=>({
                type: material.Result[0].$.TypeId,
                subtype: material.Result[0].$.SubtypeId,
                weight: 0,
                time: Number(material.BaseProductionTimeInSeconds[0]),
                prerequisites: material.Prerequisites[0].Item.reduce((req, item)=>{
                  const title = `Component/${item.$.SubtypeId}`;
                  req[title] = Number(item.$.Amount) + (title in req ? Number(req[title]) : 0);
                  return req;
                }, Object.create(null)),
              }));
          resolve(blockDtos);
        } catch(transformError) {
          console.error(transformError, bp)
          reject(transformError);
        };
      });
    });
}