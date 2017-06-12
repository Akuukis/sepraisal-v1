import * as React from 'react';
import { observer } from 'mobx-react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

import Theme from './containers/Theme';
import App from './containers/App';
import TodoApp from './containers/TodoApp';
import Home from './containers/Home';


@observer
export class Routes extends React.Component<{}, {}> {

  render() {
    return (
      <Router history={hashHistory} >
        <Route component={Theme}>
          <Route path='/' component={App} >
            <IndexRoute component={Home} />
            <Redirect from='/home' to='/' />
            <Route path='/blueprint' component={null} >
              <IndexRoute component={TodoApp} />
              <Route path=':blueprint' component={TodoApp} />
            </Route>
            <Route path='/mods' component={null} >
              <IndexRoute component={null} />
              <Route path='block' component={null} />
              <Route path='component' component={null} />
              <Route path='ingot' component={null} />
              <Route path='ore' component={null} />
              <Route path='converter' component={null} />
            </Route>
            <Route path='/modpacks' component={null} />
            <Route path='/help' component={null} >
              <IndexRoute component={null} />
              <Route path=':page' component={null} />
            </Route>
            <Route path='/credits' component={null} />
          </Route>
        </Route>
      </Router>
    );
  }

}
