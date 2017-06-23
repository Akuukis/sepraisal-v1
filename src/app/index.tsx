import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { hashHistory, Router } from 'react-router';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { TodoModel } from './models/TodoModel';
import { TodoStore, RouterStore, NavigationStore } from './stores';
import { STORE_TODO, STORE_ROUTER, STORE_NAVIGATION } from './constants/stores';
import { TodoFilter } from './constants/todos';
import { routes } from './routes';

// enable MobX strict mode
useStrict(true);

// default fixtures for TodoStore
const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React', true),
];

// prepare MobX stores
const todoStore = new TodoStore(defaultTodos);
const routerStore = new RouterStore(hashHistory);
const navigationStore = new NavigationStore();
const rootStores = {
  [STORE_TODO]: todoStore,
  [STORE_ROUTER]: routerStore,
  [STORE_NAVIGATION]: navigationStore,
};

injectTapEventPlugin();
ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={hashHistory} >
      { routes }
    </Router>
  </Provider >,
  document.getElementById('root')
);