import * as React from 'react';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { ComponentRouted } from '../../common/';
import { STORE_BLUMMARY, STORE_ANALYSIS } from '../../constants/stores';
import { BlummaryStore, AnalysisStore } from '../../stores/';
import AnalysisColumn from './Column';
import Selector from '../../components/Selector';

export type AnalysisClasses = 'root';
const styles: StyleRulesCallback<AnalysisClasses> = (theme) => ({
  root: {}
})

@inject(STORE_BLUMMARY, STORE_ANALYSIS)
@observer
class Analysis extends ComponentRouted<{}, AnalysisClasses> {
  blummaryStore = this.props[STORE_BLUMMARY] as BlummaryStore;
  analysisStore = this.props[STORE_ANALYSIS] as AnalysisStore;

  select = (title: string) => {
    this.analysisStore.add(this.blummaryStore.get(title));
  }

  @computed get count() {
    return this.analysisStore.size;
  }

  @computed get blummaries() {
    return this.blummaryStore.map( (blummary)=>{ return {key: blummary.raw.title, title: blummary.raw.title}});
  }

  @computed get renderAnalysis() {
    const width = Math.floor(12 / this.count) as 1|2|3|4|6|12;
    return (
      <Grid container spacing={16} style={{padding:'8px'}}>
        { this.analysisStore.map((analysis)=>(
          <Grid item xs={width} key={analysis.blummary.title}>
            <AnalysisColumn
              analysis={analysis}
              remove={action(()=>this.analysisStore.delete(analysis.blummary.title))}
            />
          </Grid>
        )) }
      </Grid>
    )

  }

  render() {
    return this.count === 0 ? <Selector /> : this.renderAnalysis;
  }
}
export default withStyles(styles)<{}>(Analysis);
