/** Global definitions for developement **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

// for .sbc that are XMLs
declare module '*.sbc' {
  const content: BlueprintObject;
  export = content;
}

// Blueprint Object
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

  declare interface Id extends xml2js {
    $: {
      Type: 'MyObjectBuilder_ShipBlueprintDefinition',
      Subtype: string,
    }
  }

  declare interface ShipBlueprint extends xml2js {
    Id: [Id],
    DisplayName: [string],
    CubeGrids: [CubeGrids],
    WorkshopId: [string],
    OwnerSteamId: [string],
    Points: [number],
  }

  declare interface ShipBlueprints extends xml2js {
    ShipBlueprint: [ShipBlueprint], 
  }

  declare interface Definitions extends xml2js {
    $: {
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    },
    ShipBlueprints: [ShipBlueprints],
  }

  declare interface BlueprintObject {
    Definitions: Definitions,
  }
