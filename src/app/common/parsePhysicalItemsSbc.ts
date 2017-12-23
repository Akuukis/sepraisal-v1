import { parseString } from 'xml2js';

import { MaterialDTO } from '../models/Material';
import { ComponentDTO } from './../models/Component';
import { IngotDTO } from '../models/Ingot';
import { OreDTO } from '../models/Ore';

export async function parsePhysicalItemsSbc(xml: string, filter: 'Component'): Promise<ComponentDTO[]>
export async function parsePhysicalItemsSbc(xml: string, filter: 'Ingot'): Promise<IngotDTO[]>
export async function parsePhysicalItemsSbc(xml: string, filter: 'Ore'): Promise<OreDTO[]>
export async function parsePhysicalItemsSbc(xml, filter) {
    return new Promise( (resolve: (value: Partial<MaterialDTO>[])=>void, reject: (reason: Error)=>void) => {
      parseString(xml, (parseError: Error, bp: PhysicalItemDefinition) => {
        if(parseError) reject(parseError);
        try {
          const itemsDirty = bp.Definitions.PhysicalItems[0].PhysicalItem;
          const items = itemsDirty
            .filter((item)=>item.Id[0].TypeId==filter)
            .map((item)=>{
              return {
                displayName: item.DisplayName[0],
                mass: Number(item.Mass[0]),
                size: {
                  X: Number(item.Size[0].X[0]),
                  Y: Number(item.Size[0].Y[0]),
                  Z: Number(item.Size[0].Z[0]),
                },
                subtype: item.Id[0].SubtypeId[0],
                type: item.Id[0].TypeId[0],
                volume: Number(item.Volume[0]),
              };
            })
            console.log(items);
          resolve(items);
        } catch(transformError) {
          console.error(transformError, bp)
          reject(transformError);
        };
      });
    });
  }
