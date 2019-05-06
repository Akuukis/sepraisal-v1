import { parseString } from 'xml2js';

import { BlockDTO } from './../models/Block';

export function parseBlockSbc(blockXml: string) {
  return new Promise( (resolve: (value: BlockDTO[])=>void, reject: (reason: Error)=>void) => {
    parseString(blockXml, (parseError: Error, bp: BlockDefinition) => {
      if(parseError) reject(parseError);
      try {
        const blockDtos: BlockDTO[] = [];
        const upgradeModuleTypeId: string = 'UpgradeModule';
        bp.Definitions.CubeBlocks[0].Definition
          .forEach((block)=>{
            /* as of May 2019, UpgradeModules are missing BuildTimeSeconds */
            if(block.Id[0].TypeId[0] === upgradeModuleTypeId)
              block.BuildTimeSeconds = [1];
            if(!block.BuildTimeSeconds) return;
            const prerequisites = block.Components[0].Component.reduce((req, comp)=>{
                const title = `Component/${comp.$.Subtype}`;
                req[title] = Number(comp.$.Count) + (title in req ? Number(req[title]) : 0);
                return req;
              }, Object.create(null));
            /* projectors have strange naming compared to other types */
            var name = block.Id[0].TypeId[0];
            var names = [ name, name.substr('MyObjectBuilder_'.length) ];
            names.forEach((tpName)=>{
                blockDtos.push({
                type: tpName,
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
          });
        resolve(blockDtos);
      } catch(transformError) {
        console.error(transformError, bp)
        reject(transformError);
      };
    });
  });
}
