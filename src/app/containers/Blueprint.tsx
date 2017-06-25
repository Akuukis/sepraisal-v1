import * as React from 'react';
import {computed} from 'mobx';
import { inject, observer } from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { ComponentRouted } from '../common/';
import { STORE_BLUMMARY } from '../constants/stores';
import { BlummaryStore } from '../stores/BlummaryStore';
import Selector from '../components/Selector';

const style = createStyleSheet('Blueprint', (theme) => ({
}));

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

@inject(STORE_BLUMMARY)
@withStyles(style)
@observer
export default class Blueprint extends ComponentRouted<{}, {}, {}> {


  constructor(props) {
    super(props);

    this.go = this.go.bind(this);
  }

  go(title: string) {
    this.props.router.push(`/blueprint/${title}`)
  }

  @computed get count() {
    return 0;
  }

  @computed get blummaries() {
    return (this.props[STORE_BLUMMARY] as BlummaryStore).map( (blummary)=>{ return {key: blummary.raw.title, title: blummary.raw.title}});
  }

  @computed get renderSelector() {
    return (
        <Selector lines={this.blummaries} onClick={this.go} />
    )
  }

  @computed get renderAnalysis() {
    return (
      <Grid container>

        <Grid item xs={12} sm={12} md={12} lg={12} >

        </Grid>
      </Grid>
    )

  }

  render() {
    return this.count == 0 ? this.renderSelector : this.renderAnalysis;
  }
};
