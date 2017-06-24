interface xml2js {
}

declare interface CubeBlock extends xml2js {
  $: {
    'xsi:type': string,
  },
  SubtypeName: [string],
  BuiltBy: [string],
}

declare interface CubeBlocks extends xml2js {
  MyObjectBuilder_CubeBlock: CubeBlock[],
}

declare interface CubeGrid extends xml2js {
  CubeBlocks: [CubeBlocks],
  SubtypeName: [string],
  EntityId: [string],
  PersistentFlags: [string],
  PositionAndOrientation: any,
  GridSizeEnum: ['Large' | 'Small'],
  ConveyorLines: any,
  DisplayName: [string],
  OxygenAmount: any,
  DestructibleBlocks: ['true'|'false'],
  IsRespawnGrid: ['true'|'false'],
  LocalCoordSys: [string],
  TargetingTargets: [string],
}

declare interface CubeGrids extends xml2js {
  CubeGrid: CubeGrid[], 
}
