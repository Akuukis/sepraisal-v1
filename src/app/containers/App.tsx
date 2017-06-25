import * as React from 'react';
import {observable, action, computed} from 'mobx';
import {observer, inject} from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';

import { STORE_BLUMMARY } from '../constants/stores';
import { BlummaryStore } from '../stores/BlummaryStore';

import Topbar from '../components/Topbar';
import Navigation from '../components/Navigation';
import Loading from "../components/Loading";

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
@inject(STORE_BLUMMARY)
@observer
export default class App extends React.Component<any, any> {
  @observable public isDrawerOpen: boolean = false;
  @observable private loaded: boolean = false;

  constructor(props) {
    super(props);

    this.setDrawer = this.setDrawer.bind(this);
  }

  async componentDidMount() {
    const blummaryStore = this.props[STORE_BLUMMARY] as BlummaryStore;
    await blummaryStore.addPrefabs();
    this.proceed();
  }

  @action proceed() {
    this.loaded = true;
  }

  @computed get ready(): boolean {
      const cacheStore = this.props[STORE_BLUMMARY] as BlummaryStore;
      return true
        && this.loaded;
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
            { this.ready ? this.props.children : <Loading />}
          </Paper>
          {this.renderDevTool()}
        </Paper>
    );
  }
};
