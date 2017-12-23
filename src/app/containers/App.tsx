import * as React from 'react';
import {observable, action, computed} from 'mobx';
import {observer, inject} from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';

import { ComponentRouted } from '../common/';
import {STORE_BLUMMARY, STORE_BLOCK, STORE_COMPONENT, STORE_INGOT, STORE_ORE} from '../constants/stores';
import {BlockStore, BlummaryStore, ComponentStore, IngotStore, OreStore} from '../stores/';

import Topbar from '../components/Topbar';
import Navigation from '../components/Navigation';
import Loading from "../components/Loading";

import * as background from '../../assets/background-center-bright.jpg';

export type AppClasses = 'app'|'content';
const styles: StyleRulesCallback<AppClasses> = (theme) => ({
  app: {
    position: 'fixed',
    left: 0,
    width: '100%',
    height: '100%',
    fontFamily: '"Roboto", Helvetica, Arial, sans-serif',
    background: '#f0f0f0',
    // color: '#4d4d4d',
    minWidth: '230px',
    fontSmoothing: 'antialiased',
    fontWeight: 300,
    overflow: 'hidden',
  },
  content: {
    backgroundImage: `url('${background}')`,
    overflowY: 'visible',
    paddingRight: '8px',
    overflowX: 'hidden',
  },
  '@media (min-width: 0px)': {
      app: {
        top: 56,
      },
      content: {
          height: 'calc(100% - 56px)',
          backgroundPosition: 'center -56px',
      },
  },
  '@media (min-width: 600px)': {
      app: {
        top: 64,
      },
      content: {
          height: 'calc(100% - 64px)',
          backgroundPosition: 'center -64px',
      },
  },
});

@inject(STORE_BLUMMARY, STORE_BLOCK, STORE_COMPONENT, STORE_INGOT, STORE_ORE)
@observer
class App extends ComponentRouted<{}, AppClasses> {
  @observable public isDrawerOpen: boolean = false;
  @observable private loaded: boolean = false;

  constructor(props) {
    super(props);

    this.setDrawer = this.setDrawer.bind(this);
  }

  async componentDidMount() {
    try {
      const blummaryStore = this.props[STORE_BLUMMARY] as BlummaryStore;
      const blockStore = this.props[STORE_BLOCK] as BlockStore;
      const componentStore = this.props[STORE_COMPONENT] as ComponentStore;
      const ingotStore = this.props[STORE_INGOT] as IngotStore;
      const oreStore = this.props[STORE_ORE] as OreStore;
      await blummaryStore.addPrefabs();
      await blockStore.reset();
      await componentStore.reset();
      await ingotStore.reset();
      await oreStore.reset();
      this.proceed();
    } catch(e) {
      console.error(e);
    }
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
    if (process.env.NODE_ENV === 'development') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
  };

  @action setDrawer(open: boolean): void { this.isDrawerOpen = open || false };

  render() {
    return (
        <Paper className={this.props.classes.app}>
          <Drawer
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
export default withStyles(styles)<{}>(App);

