import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';

import Topbar from '../components/Topbar';
import Navigation from '../components/Navigation';

import * as background from '../../assets/background-center-bright.jpg';

const style = createStyleSheet('App', (theme) => ({
  app: {

    position: 'fixed',
    left: 0,
    top: 64,
    width: '100%',
    height: '100%',
    font: '"Roboto", Helvetica, Arial, sans-serif',
    background: '#f0f0f0',
    // color: '#4d4d4d',
    minWidth: '230px',
    fontSmoothing: 'antialiased',
    fontWeight: 300,
  },
  content: {
    backgroundImage: `url('${background}')`,
    backgroundPosition: 'center -64px',
    height: '100%',

  }
}));

@withStyles(style)
@observer
export default class App extends React.Component<any, any> {
  @observable public isDrawerOpen: boolean = false;

  constructor(props) {
    super(props);

    this.setDrawer = this.setDrawer.bind(this);
  }

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
  };

  @action setDrawer(open: boolean): void { this.isDrawerOpen = open || false };

  render() {
    return (
        <Paper className={this.props.classes.app}>
          <Drawer
            docked={false}
            open={this.isDrawerOpen}
            onRequestClose={()=>this.setDrawer(false)}
          >
            <Navigation />
          </Drawer>
          <Topbar setDrawer={this.setDrawer} />
          <Paper className={this.props.classes.content}>
            {this.props.children}
          </Paper>
          {this.renderDevTool()}
        </Paper>
    );
  }
};
