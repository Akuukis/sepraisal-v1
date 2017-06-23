import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Theme from './containers/Theme';
import App from './containers/App';
import Home from './containers/Home';


export const routes = (
  <Route component={Theme}>
  <Route path='/' component={App} >
    <IndexRoute component={Home} />
    <Redirect from='/home' to='/' />
    <Route path='/blueprint' component={null} >
      <IndexRoute component={null} />
      <Route path=':blueprint' component={null} />
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
)