import * as React from 'react';
import { inject, observer } from 'mobx-react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconNavigationMenu from 'material-ui/svg-icons/navigation/menu'

import {STORE_NAVIGATION} from "../../constants/stores";
import {NavigationStore} from "../../stores/";
import Navigation from "../Navigation/";
import './style.css';


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
      <MuiThemeProvider>
        <Paper id='container'>
          <AppBar
              className='topBar'
              iconElementLeft={<IconButton onClick={navigation.openDrawer}><IconNavigationMenu /></IconButton>}
              title={'Space Engineers Praisal: Blueprint Parser & Analyzer'}
          />
          <Drawer
              className='drawer'
              docked={false}
              open={navigation.isDrawerOpen}
              onRequestChange={navigation.closeDrawer}
          >
            <Navigation />
          </Drawer>
          {this.props.children}
          {this.renderDevTool()}
        </Paper>
      </MuiThemeProvider>
    );
  }
};
