declare interface MaterialId extends xml2js {
  TypeId: ['BlueprintDefinition'],
  SubtypeId: [string],
}

declare interface MaterialItem extends xml2js {
  $: {
    TypeId: string,
    SubtypeId: string,
    Amount: string,
  },
}

declare interface MaterialPrerequisites extends xml2js {
  Item: [MaterialItem],
}

declare interface MaterialBlueprint extends xml2js {
  Id: [MaterialId],
  DisplayName: [string],
  Prerequisites: [MaterialPrerequisites],
  Result: [MaterialItem],
  BaseProductionTimeInSeconds: [number],
  // ...
}

declare interface MaterialBlueprints extends xml2js {
  Blueprint: [MaterialBlueprint],
}

declare interface MaterialDefinitions extends xml2js {
  $: {
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  },
  Blueprints: [MaterialBlueprints],
}

declare interface MaterialDefinition {
  Definitions: MaterialDefinitions,
}

/*

<?xml version="1.0"?>
<Definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Blueprints>
    <Blueprint>
      <Id>
        <TypeId>BlueprintDefinition</TypeId>
        <SubtypeId>StoneOreToIngot</SubtypeId>
      </Id>
      <DisplayName>DisplayName_Item_Gravel</DisplayName>
      <Icon>Textures\GUI\Icons\ingot\gravel_ingot.dds</Icon>
      <Prerequisites>
        <Item Amount="1" TypeId="Ore" SubtypeId="Stone" />
      </Prerequisites>
      <Result Amount="0.9" TypeId="Ingot" SubtypeId="Stone" />
      <BaseProductionTimeInSeconds>0.1</BaseProductionTimeInSeconds>
    </Blueprint>

*/