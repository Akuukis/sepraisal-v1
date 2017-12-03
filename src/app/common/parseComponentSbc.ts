import { parseString } from 'xml2js';

import { ComponentDTO } from './../models/Component';

export async function parseComponentSbc(xml: string) {
    return new Promise( (resolve: (value: Partial<ComponentDTO>[])=>void, reject: (reason: Error)=>void) => {
      parseString(xml, (parseError: Error, bp: ComponentDefinition) => {
        if(parseError) reject(parseError);
        try {
          const componentsDirty = bp.Definitions.Components[0].Component;
          const components = componentsDirty
            .map((comp)=>{
              return {
                displayName: comp.DisplayName[0],
                health: Number(comp.Health ? comp.Health[0] : 0),
                maxIntegrity: Number(comp.MaxIntegrity[0]),
                mass: Number(comp.Mass[0]),
                size: {
                  X: Number(comp.Size[0].X[0]),
                  Y: Number(comp.Size[0].Y[0]),
                  Z: Number(comp.Size[0].Z[0]),
                },
                subtype: comp.Id[0].SubtypeId[0],
                type: comp.Id[0].TypeId[0],
                volume: Number(comp.Volume[0]),
              };
            })
          resolve(components);
        } catch(transformError) {
          console.error(transformError, bp)
          reject(transformError);
        };
      });
    });
  }
