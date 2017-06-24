declare interface ShipId extends xml2js {
  $: {
    Type: 'MyObjectBuilder_ShipBlueprintDefinition',
    Subtype: string,
  }
}

declare interface ShipBlueprint extends xml2js {
  Id: [ShipId],
  DisplayName: [string],
  CubeGrids: [CubeGrids],
  WorkshopId: [string],
  OwnerSteamId: [string],
  Points: [number],
}

declare interface ShipBlueprints extends xml2js {
  ShipBlueprint: [ShipBlueprint], 
}

declare interface ShipDefinitions extends xml2js {
  $: {
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
  ShipBlueprints: [ShipBlueprints],
}

declare interface ShipBlueprintDefinition {
  Definitions: ShipDefinitions,
}
