import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';

import {Component} from "../common/";
import { RouterStore } from './../stores/';
import { STORE_ROUTER } from './../constants/stores';
import { ROUTES } from '../constants/routes';

export type NavigationClasses = 'root';
const styles: StyleRulesCallback<NavigationClasses> = (theme) => ({
  root: {}
})

@inject(STORE_ROUTER)
@observer
class Navigation extends Component<{}, NavigationClasses> {

  h = (event: React.MouseEvent<Element>) => {
    const router = this.props[STORE_ROUTER] as RouterStore;
    const path = event.currentTarget.getAttribute('value');
    router.push(path);
  }

  render() {
    return (<List>
        <ListItem button onClick={this.h} value={ROUTES.HOME}><ListItemText primary="Home" /></ListItem>
        <ListItem button onClick={this.h} value={ROUTES.ANALYSIS}><ListItemText primary="Analyze" /></ListItem>
        <ListItem button onClick={this.h} disabled value={ROUTES.MODS}><ListItemText primary="Manage Mods" /></ListItem>
        <ListItem button onClick={this.h} disabled value={ROUTES.MODPACKS}><ListItemText primary="Manage Modpacks" /></ListItem>
        <ListItem button onClick={this.h} disabled value={ROUTES.HELP}><ListItemText primary="Help" /></ListItem>
        <ListItem button onClick={this.h} value={ROUTES.CREDITS}><ListItemText primary="Credits" /></ListItem>
      </List>);
  }

}
export default withStyles(styles)<{}>(Navigation);
