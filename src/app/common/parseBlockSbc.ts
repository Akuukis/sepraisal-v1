import { parseString } from 'xml2js';

import { BlockDTO } from './../models/Block';

export function parseBlockSbc(blockXml: string) {
  return new Promise( (resolve: (value: BlockDTO[])=>void, reject: (reason: Error)=>void) => {
    parseString(blockXml, (parseError: Error, bp: BlockDefinition) => {
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
              time: Number(block.BuildTimeSeconds[0]),
              size: {
                X: Number(block.Size[0].$.x),
                Y: Number(block.Size[0].$.y),
                Z: Number(block.Size[0].$.z),
              },
              prerequisites,
            });
          });
        resolve(blockDtos);
      } catch(transformError) {
        console.error(transformError, bp)
        reject(transformError);
      };
    });
  });
}
