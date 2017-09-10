declare interface BlockId extends xml2js {
  TypeId: ['CubeBlock'],
  SubtypeId: [string],
}

declare interface BlockComponent extends xml2js {
  $: {
    Subtype: string,
    Count: number,
  },
}

declare interface BlockComponents extends xml2js {
  Component: [BlockComponent],
}

declare interface BlockDefinition extends xml2js {
  Id: [BlockId],
  DisplayName: [string],
  Components: [BlockComponents],
  BuildTimeSeconds: [number],
  // ...
}

declare interface BlockCubeBlocks extends xml2js {
  Definition: [BlockDefinition],
}

declare interface BlockDefinitions extends xml2js {
  $: {
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
  CubeBlocks: [BlockCubeBlocks],
}

declare interface BlockDefinition {
  Definitions: BlockDefinitions,
}
