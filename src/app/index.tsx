import * as React from 'react';
import { render } from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { hashHistory, Router } from 'react-router';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader'

import { BlummaryStore, RouterStore, BlockStore, ComponentStore, IngotStore, OreStore, AnalysisStore } from './stores';
import { STORE_BLUMMARY, STORE_ROUTER, STORE_BLOCK, STORE_COMPONENT, STORE_INGOT, STORE_ORE, STORE_ANALYSIS } from './constants/stores';
import routes from './routes';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const routerStore = new RouterStore(hashHistory);
const blummaryStore = new BlummaryStore();
const blockStore = new BlockStore();
const componentStore = new ComponentStore();
const ingotStore = new IngotStore();
const oreStore = new OreStore();
const analysisStore = new AnalysisStore(blockStore, componentStore, ingotStore, oreStore);
const rootStores = {
  [STORE_BLUMMARY]: blummaryStore,
  [STORE_ROUTER]: routerStore,
  [STORE_BLOCK]: blockStore,
  [STORE_COMPONENT]: componentStore,
  [STORE_INGOT]: ingotStore,
  [STORE_ORE]: oreStore,
  [STORE_ANALYSIS]: analysisStore,
};

injectTapEventPlugin();

const renderApp = () => {

  render(
    <AppContainer>
      <Provider {...rootStores} >
        <Router history={hashHistory} >
          { routes }
        </Router>
      </Provider >
    </AppContainer>,
    document.getElementById('root')
  );

};

// Hot Module Replacement API
if (module.hot) module.hot.accept('./containers/App', renderApp);

renderApp();
