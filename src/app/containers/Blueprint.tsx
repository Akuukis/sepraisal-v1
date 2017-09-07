import * as React from 'react';
import {computed} from 'mobx';
import { inject, observer } from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { ComponentRouted } from '../common/';
import { STORE_BLUMMARY, STORE_ANALYSIS } from '../constants/stores';
import { BlummaryStore, AnalysisStore } from '../stores/';
import AnalysisBar from '../components/AnalysisBar';
import Selector from '../components/Selector';

const style = createStyleSheet('Blueprint', (theme) => ({
}));

@inject(STORE_BLUMMARY, STORE_ANALYSIS)
@withStyles(style)
@observer
export default class Blueprint extends ComponentRouted<{}, {}, {}> {

  constructor(props) {
    super(props);

    this.select = this.select.bind(this);
  }

  select(title: string) {
    (this.props[STORE_ANALYSIS] as AnalysisStore).add((this.props[STORE_BLUMMARY] as BlummaryStore).get(title));
  }

  @computed get count() {
    return (this.props[STORE_ANALYSIS] as AnalysisStore).size;
  }

  @computed get blummaries() {
    return (this.props[STORE_BLUMMARY] as BlummaryStore).map( (blummary)=>{ return {key: blummary.raw.title, title: blummary.raw.title}});
  }

  @computed get renderSelector() {
    return (
        <Selector lines={this.blummaries} onClick={this.select} />
    )
  }

  @computed get renderAnalysis() {
    const width = Math.floor(12 / this.count);
    return (
      <Grid container>
        { (this.props[STORE_ANALYSIS] as AnalysisStore).map((analysis)=>(
          <Grid item xs={width} key={analysis.blummary.title}>
            <AnalysisBar
              analysis={analysis}
            />
          </Grid>
        )) }
      </Grid>
    )

  }

  render() {
    return this.count == 0 ? this.renderSelector : this.renderAnalysis;
  }
};
