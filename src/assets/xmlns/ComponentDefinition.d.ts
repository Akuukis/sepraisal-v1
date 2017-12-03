declare interface ComponentId extends xml2js {
  TypeId: ['CubeBlock'],
  SubtypeId: [string],
}

declare interface ComponentSize extends xml2js {
  X: [number],
  Y: [number],
  Z: [number],
}

declare interface ComponentBlueprint extends xml2js {
  Id: [ComponentId],
  DisplayName: [string],
  Health: [number],
  MaxIntegrity: [number],
  Mass: [number],
  Volume: [number],
  Size: [ComponentSize],
  // ...
}

declare interface ComponentBlueprints extends xml2js {
  Component: [ComponentBlueprint],
}

declare interface ComponentDefinitions extends xml2js {
  $: {
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
  Components: [ComponentBlueprints],
}

declare interface ComponentDefinition {
  Definitions: ComponentDefinitions,
}



/*

<?xml version="1.0"?>
<Definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Components>
    <Component>
      <Id>
        <TypeId>Component</TypeId>
        <SubtypeId>Construction</SubtypeId>
      </Id>
      <DisplayName>DisplayName_Item_ConstructionComponent</DisplayName>
      <Icon>Textures\GUI\Icons\component\construction_components_component.dds</Icon>
      <Size>
        <X>0.2</X>
        <Y>0.1</Y>
        <Z>0.1</Z>
      </Size>
      <Mass>8</Mass>
      <Volume>2</Volume>
      <Model>Models\Components\construction_components_component.mwm</Model>
      <PhysicalMaterial>Metal</PhysicalMaterial>
      <MaxIntegrity>30</MaxIntegrity>
      <DropProbability>0.5</DropProbability>
      <Health>18</Health>
    </Component>
  </Components>
</Definitions>

*/