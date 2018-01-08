# Space Engineers Praisal: Blueprint Parser & Analyzer

## Setup

```
yarn install
yarn start
yarn build
# yarn run deploy-github
```

# License

GPLv3

# TODO

> In the future, it will also be able to
> * praise your blueprints according to various popular MP servers (in credits, XP, etc.),
> * measure compliance level to popular MP server grid limits,
> * calculate production times,
> * handle mods (and modpacks),
> * do smart block analysis to report freight, production and mobility perfomance,
> * and understand TIM tags for more interesting reports.

Stores:
- BP
- Assumptions
- Blocks
- Components
- Ingots
- Ores
- Converters

Views:
- Main (side-by-side compare)
  - upload/link BP
  - upload/edit config
  - assumptions
  - Summary
  - Matter Charts (Pie/Bar) + list
    - blocks
    - components
    - ingots
    - ores
  - Time charts (Pie/Bar) + list
    - ores -> ingots (refinery)
    - ingots -> components (assembler)
    - commponents -> blocks (welder)
- Mod management
  - block management
  - components management
  - ingot management
  - ore management
  - converter management
- Modpack management
