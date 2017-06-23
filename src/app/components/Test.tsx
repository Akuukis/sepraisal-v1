import * as React from 'react';
import * as cxml from 'cxml';

import * as bp from '../../../../assets/blueprints/EveryLargeBlockOnce/bp.sbc';

export interface TestProps {
  /* empty */
}

export interface TestState {
  /* empty */
}

export class Test extends React.Component<TestProps, TestState> {

  constructor(props?: TestProps, context?: any) {
    super(props, context);
    this.test = this.test.bind(this);

    this.test();
  }

  async test(): Promise<void> {
    var parser = new cxml.Parser();
    const cubeGrids = bp.Definitions.ShipBlueprints[0].ShipBlueprint[0].CubeGrids[0];
    const cubeBlocks = cubeGrids.CubeGrid.reduce( (aggr: CubeBlock[], cubeGrid: CubeGrid) => aggr.concat(cubeGrid.CubeBlocks[0].MyObjectBuilder_CubeBlock), [] );
    const blocks = cubeBlocks.map( (cubeBlock: CubeBlock) => {
      return {
        type: cubeBlock.$['xsi:type'],
        subtype: cubeBlock.SubtypeName[0]
       }; 
    });
    const title = bp.Definitions.ShipBlueprints[0].ShipBlueprint[0].Id[0].$.Subtype;
    console.log(title, cubeBlocks, blocks)
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Test;



