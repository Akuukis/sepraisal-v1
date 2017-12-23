declare interface PhysicalItemId extends xml2js {
  TypeId: ['BlueprintDefinition'],
  SubtypeId: [string],
}

declare interface ComponentSize extends xml2js {
  X: [number],
  Y: [number],
  Z: [number],
}

declare interface PhysicalItemBlueprint extends xml2js {
  Id: [PhysicalItemId],
  DisplayName: [string],
  Mass: [number],
  Volume: [number],
  Size: [ComponentSize],
  // ...
}

declare interface PhysicalItemBlueprints extends xml2js {
  PhysicalItem: [PhysicalItemBlueprint],
}

declare interface PhysicalItemDefinitions extends xml2js {
  $: {
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
  PhysicalItems: [PhysicalItemBlueprints],
}

declare interface PhysicalItemDefinition {
  Definitions: PhysicalItemDefinitions,
}

/*
<?xml version="1.0"?>
<Definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <PhysicalItems>
    <PhysicalItem>
      <Id>
        <TypeId>Ore</TypeId>
        <SubtypeId>Stone</SubtypeId>
      </Id>
      <DisplayName>DisplayName_Item_StoneOre</DisplayName>
      <Icon>Textures\GUI\Icons\ore_rock.dds</Icon>
      <Size>
        <X>0.07</X>
        <Y>0.07</Y>
        <Z>0.07</Z>
      </Size>
      <Mass>1</Mass>
      <Volume>0.37</Volume>
      <Model>Models\Components\Sphere.mwm</Model>
      <PhysicalMaterial>Stone</PhysicalMaterial>
      <IconSymbol>IconSymbol_Stone</IconSymbol>
    </PhysicalItem>
*/












/*

  <PhysicalItems>
    <PhysicalItem>
      <Id>
        <TypeId>Ore</TypeId>
        <SubtypeId>Stone</SubtypeId>
      </Id>
      <DisplayName>DisplayName_Item_StoneOre</DisplayName>
      <Icon>Textures\GUI\Icons\ore_rock.dds</Icon>
      <Size>
        <X>0.07</X>
        <Y>0.07</Y>
        <Z>0.07</Z>
      </Size>
      <Mass>1</Mass>
      <Volume>0.37</Volume>
      <Model>Models\Components\Sphere.mwm</Model>
      <PhysicalPhysicalItem>Stone</PhysicalPhysicalItem>
      <IconSymbol>IconSymbol_Stone</IconSymbol>
    </PhysicalItem>

*/