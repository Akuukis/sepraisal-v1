import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, IndexRoute, Redirect } from 'react-router';

import { ROUTES, ROUTES_MODS } from './constants/routes';
import Theme from './containers/Theme';
import App from './containers/App';
import Home from './containers/Home';
import Credits from './containers/Credits';
import Analysis from './containers/Analysis';


export const routes = (
  <Route component={Theme}>
    <Route path={`/`} component={App} >
      <IndexRoute component={Home} />
      <Redirect from={ROUTES.HOME} to={`/`} />
      <Route path={ROUTES.ANALYSIS} component={Analysis} >
        <IndexRoute component={null} />
        <Route path={`:blueprint`} component={null} />
      </Route>
      <Route path={ROUTES.MODS} component={null} >
        <IndexRoute component={null} />
        <Route path={ROUTES_MODS.BLOCK} component={null} />
        <Route path={ROUTES_MODS.COMPONENT} component={null} />
        <Route path={ROUTES_MODS.CONVERTER} component={null} />
        <Route path={ROUTES_MODS.INGOT} component={null} />
        <Route path={ROUTES_MODS.ORE} component={null} />
      </Route>
      <Route path={ROUTES.MODPACKS} component={null} />
      <Route path={ROUTES.HELP} component={null} >
        <IndexRoute component={null} />
        <Route path={`:page`} component={null} />
      </Route>
      <Route path={ROUTES.CREDITS} component={Credits} />
    </Route>
  </Route>
)
export default routes;
