declare interface BlueprintPrefabId extends xml2js {
  TypeId: ['MyObjectBuilder_PrefabDefinition'],
  SubtypeId: [string],
}

declare interface BlueprintPrefab extends xml2js {
  Id: [BlueprintPrefabId],
  DisplayName: [string],
  CubeGrids: [BlueprintCubeGrids],
  WorkshopId: [string],
  OwnerSteamId: [string],
  Points: [number],
}

declare interface BlueprintPrefabs extends xml2js {
  Prefab: [BlueprintPrefab], 
}

declare interface BlueprintPrefabDefinitions extends xml2js {
  $: {
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
  Prefabs: [BlueprintPrefabs],
}

declare interface BlueprintPrefabBlueprintDefinition {
  Definitions: BlueprintPrefabDefinitions,
}
