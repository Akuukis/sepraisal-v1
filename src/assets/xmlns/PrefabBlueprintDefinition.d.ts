declare interface PrefabId extends xml2js {
  TypeId: ['MyObjectBuilder_PrefabDefinition'],
  SubtypeId: [string],
}

declare interface Prefab extends xml2js {
  Id: [PrefabId],
  DisplayName: [string],
  CubeGrids: [CubeGrids],
  WorkshopId: [string],
  OwnerSteamId: [string],
  Points: [number],
}

declare interface Prefabs extends xml2js {
  Prefab: [Prefab], 
}

declare interface PrefabDefinitions extends xml2js {
  $: {
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
  Prefabs: [Prefabs],
}

declare interface PrefabBlueprintDefinition {
  Definitions: PrefabDefinitions,
}
