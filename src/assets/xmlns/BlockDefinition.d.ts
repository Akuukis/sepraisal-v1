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


/*

<?xml version="1.0" encoding="utf-8"?>
<Definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <CubeBlocks>
    
    <Definition>
      <Id>
        <TypeId>CubeBlock</TypeId>
        <SubtypeId>Monolith</SubtypeId>
      </Id>
      <DisplayName>Monolith</DisplayName>
      <Icon>Textures\GUI\Icons\Fake.dds</Icon>
      <Public>false</Public>
      <CubeSize>Large</CubeSize>
      <BlockTopology>TriangleMesh</BlockTopology>
      <Size x="1" y="4" z="1" />
      <Center x="0" y="0" z="0" />
      <ModelOffset x="0" y="-4" z="0" />
      <Model>Models\Environment\Props\Monolith.mwm</Model> 
      <Components>
        <Component Subtype="SteelPlate" Count="130" />
        <Component Subtype="Superconductor" Count="130" />
      </Components>
      <CriticalComponent Subtype="Superconductor" Index="0" />
      <EdgeType>Light</EdgeType>
      <BuildTimeSeconds>200000</BuildTimeSeconds>
      <InventorySize>
        <X>1</X>
        <Y>1</Y>
        <Z>1</Z>
      </InventorySize>
    </Definition>
    

*/