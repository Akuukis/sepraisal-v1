import { action } from 'mobx';

import {ObservableMap} from './../common/';
import { Blummary } from './../models/';

// import * as EveryLargeBlockOnce from '../../../assets/blueprints/EveryLargeBlockOnce/bp.sbc';
import * as AlienLander from '../../../vendor/SpaceEngineers/prefabs/AlienLander.sbc';
import * as AtmosphericLander from '../../../vendor/SpaceEngineers/prefabs/AtmosphericLander.sbc';
import * as MarsLander from '../../../vendor/SpaceEngineers/prefabs/MarsLander.sbc';
import * as RespawnShip from '../../../vendor/SpaceEngineers/prefabs/RespawnShip.sbc';

export class BlummaryStore extends ObservableMap<Blummary> {
  @action add(blummary: Blummary) {
    this.set(blummary.raw.title, blummary);
  }

  async addPrefabs() {
    return Promise.all(
      [
        // EveryLargeBlockOnce,
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
