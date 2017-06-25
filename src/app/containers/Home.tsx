import * as React from 'react';
import {computed} from 'mobx';
import { inject, observer } from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';


import { ComponentRouted } from '../common/';
import { STORE_BLUMMARY } from '../constants/stores';
import { BlummaryStore } from '../stores/BlummaryStore';
import Selector from '../components/Selector';

const style = createStyleSheet('Home', (theme) => ({
}));

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

@inject(STORE_BLUMMARY)
@withStyles(style)
@observer
export default class Home extends ComponentRouted<{}, {}, {}> {

  constructor(props) {
    super(props);

    this.go = this.go.bind(this);
  }

  @computed get blummaries() {
    return (this.props[STORE_BLUMMARY] as BlummaryStore).map( (blummary)=>{ return {key: blummary.raw.title, title: blummary.raw.title}});
  }

  go(title: string) {
    this.props.router.push(`/blueprint/${title}`)
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <p style={{textAlign:'center'}}>Upload</p>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <p style={{textAlign:'center'}}>Analyze</p>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <p style={{textAlign:'center'}}>Compare</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Selector lines={this.blummaries} onClick={this.go} />
        </Grid>
      </Grid>
    );
  }
};
