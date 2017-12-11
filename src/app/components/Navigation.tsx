import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';

import {Component} from "../common/";
import { RouterStore } from './../stores/';
import { STORE_ROUTER } from './../constants/';

export type NavigationClasses = 'root';
const styles: StyleRulesCallback<NavigationClasses> = (theme) => ({
  root: {}
})

@inject(STORE_ROUTER)
@observer
class Navigation extends Component<{}, NavigationClasses> {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.MouseEvent<Element>) {
    const router = this.props[STORE_ROUTER] as RouterStore;
    const path = event.currentTarget.getAttribute('value');
    router.push(path);
  }

  render() {
    return (<List>
        <ListItem button onClick={this.handleClick} value={''}><ListItemText primary="Home" /></ListItem>
        <ListItem button onClick={this.handleClick} value={'blueprint'}><ListItemText primary="Blueprint" /></ListItem>
        <ListItem button onClick={this.handleClick} value={'mods'}><ListItemText primary="Manage Mods" /></ListItem>
        <ListItem button onClick={this.handleClick} value={'modpacks'}><ListItemText primary="Manage Modpacks" /></ListItem>
        <ListItem button onClick={this.handleClick} value={'help'}><ListItemText primary="Help" /></ListItem>
        <ListItem button onClick={this.handleClick} value={'credits'}><ListItemText primary="Credits" /></ListItem>
      </List>);
  }

}
export default withStyles(styles)<{}>(Navigation);
