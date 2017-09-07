interface xml2js {
}

declare interface BlueprintCubeBlock extends xml2js {
  $: {
    'xsi:type': string,
  },
  SubtypeName: [string],
  BuiltBy: [string],
}

declare interface BlueprintCubeBlocks extends xml2js {
  MyObjectBuilder_CubeBlock: BlueprintCubeBlock[],
}

declare interface BlueprintCubeGrid extends xml2js {
  CubeBlocks: [BlueprintCubeBlocks],
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

declare interface BlueprintCubeGrids extends xml2js {
  CubeGrid: BlueprintCubeGrid[], 
}
