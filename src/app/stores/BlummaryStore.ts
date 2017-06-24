import {action, ObservableMap} from "mobx";

import { Blummary } from './../models/';

import * as EveryLargeBlockOnce from '../../../assets/blueprints/EveryLargeBlockOnce/bp.sbc';
import * as AlienLander from '../../../vendor/SpaceEngineers/prefabs/AlienLander.sbc';
import * as AtmosphericLander from '../../../vendor/SpaceEngineers/prefabs/AtmosphericLander.sbc';
import * as MarsLander from '../../../vendor/SpaceEngineers/prefabs/MarsLander.sbc';
import * as RespawnShip from '../../../vendor/SpaceEngineers/prefabs/RespawnShip.sbc';

export class BlummaryStore extends ObservableMap<Blummary> {
  map<T>( callback: (blummary: Blummary, key: string)=>T ): T[] {
    const results: T[] = [];
    this.forEach((blummary: Blummary, key: string)=>results.push(callback(blummary, key)));
    return results;
  }

  add(blummary: Blummary) {
    console.log(blummary)
    this.set(blummary.raw.title, blummary);
  }

  async addPrefabs() {
    return Promise.all(
      [
        EveryLargeBlockOnce,
        AlienLander,
        AtmosphericLander,
        MarsLander,
        RespawnShip,
      ].map( (xml) =>
        Blummary.parseBlueprintXml(xml)
          .then((raw) =>
            this.add( new Blummary(raw))
          )
      )
    );
  }
}
