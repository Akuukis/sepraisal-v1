import { WSAEPROVIDERFAILEDINIT } from 'constants';
import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui-icons/Menu';

import {STORE_NAVIGATION} from "../../constants/stores";
import {NavigationStore} from "../../stores/";
import Navigation from "../Navigation/";
import './style.css';

const style = {
  position: 'fixed',
  left: 0,
  top: 64,
  width: '100%',
  height: '100%',
}

@inject(STORE_NAVIGATION)
@observer
export default class App extends React.Component<any, any> {

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
  };

  render() {
    const navigation = this.props[STORE_NAVIGATION] as NavigationStore;
    return (
        <div>
          <Drawer
            docked={false}
            open={navigation.isDrawerOpen}
            onRequestClose={navigation.closeDrawer}
            onClick={navigation.closeDrawer}
          >
            <Navigation />
          </Drawer>
          <AppBar>
            <Toolbar>
              <IconButton contrast onClick={navigation.openDrawer}>
                <IconMenu />
              </IconButton>
              <Typography type="title" colorInherit>
                {'Space Engineers Praisal: Blueprint Parser & Analyzer'}
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid item xs={12} style={style}>
            {this.props.children}
          </Grid>
          {this.renderDevTool()}
        </div>
    );
  }
};
