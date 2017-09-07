declare interface BlueprintShipId extends xml2js {
  $: {
    Type: 'MyObjectBuilder_ShipBlueprintDefinition',
    Subtype: string,
  }
}

declare interface BlueprintShipBlueprint extends xml2js {
  Id: [BlueprintShipId],
  DisplayName: [string],
  CubeGrids: [BlueprintCubeGrids],
  WorkshopId: [string],
  OwnerSteamId: [string],
  Points: [number],
}

declare interface BlueprintShipBlueprints extends xml2js {
  ShipBlueprint: [BlueprintShipBlueprint], 
}

declare interface BlueprintShipDefinitions extends xml2js {
  $: {
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
  ShipBlueprints: [BlueprintShipBlueprints],
}

declare interface BlueprintShipDefinition {
  Definitions: BlueprintShipDefinitions,
}
