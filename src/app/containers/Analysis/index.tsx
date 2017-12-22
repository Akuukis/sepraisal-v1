import * as React from 'react';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { ComponentRouted } from '../../common/';
import { STORE_ANALYSIS } from '../../constants/stores';
import { AnalysisStore } from '../../stores/';

import Selector from '../../components/Selector';
import AnalysisColumn from './Column';

export type AnalysisClasses = 'root';
const styles: StyleRulesCallback<AnalysisClasses> = (theme) => ({
  root: {}
})

@inject(STORE_ANALYSIS)
@observer
class Analysis extends ComponentRouted<{}, AnalysisClasses> {
  analysisStore = this.props[STORE_ANALYSIS] as AnalysisStore;

  @computed get width() { return Math.floor(12 / this.analysisStore.size) as 1|2|3|4|6|12; }

  render() {
    return (
      <Grid container spacing={16} style={{padding:'8px'}}>
        { this.analysisStore.map((analysis)=>(
            <AnalysisColumn
              width={this.width}
              analysis={analysis}
              remove={action(()=>this.analysisStore.delete(analysis.blummary.title))}
            />
        )) }
      </Grid>
    )

  }
}
export default withStyles(styles)<{}>(Analysis);
