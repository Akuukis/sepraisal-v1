import * as React from 'react';
import {observable, computed, action, autorun} from 'mobx';
import {observer} from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from './containers/App';
import { TodoApp } from './containers/TodoApp';

@observer
export class Routes extends React.Component<{}, {}> {

  render() {
    return (
      <Router history={browserHistory} >
        <Route path='/' component={App} >
          <IndexRoute component={TodoApp} />
        </Route>
      </Router>
    );
  }

}