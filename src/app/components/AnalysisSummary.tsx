import * as React from 'react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';

import {Component} from "../common/";
import {Analysis, AnalysisRowProps} from "../models/";
import AnalysisSummaryRow from './AnalysisSummaryRow';

export type AnalysisSummaryClasses = 'root';
const styles: StyleRulesCallback<AnalysisSummaryClasses> = (theme) => ({
  root: {}
})

class AnalysisSummary extends Component<AnalysisRowProps, AnalysisSummaryClasses> {

  render() {
    const { analysis } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <List>
            <AnalysisSummaryRow title={'Title'} value={analysis.blummary.title} errors={[]} />
            <AnalysisSummaryRow title={'Blocks'} value={`${analysis.blockCount.toFixed(0)} pc`} errors={analysis.blocksErrors} />
            <AnalysisSummaryRow title={'Components'} value={`${analysis.componentCount.toFixed(0)} pc`} errors={analysis.componentErrors} />
            <AnalysisSummaryRow title={'Weight'} value={`${(analysis.blockMass/1000).toFixed(1)} t`} errors={[]} />
            <AnalysisSummaryRow title={'Ingots'} value={`${(analysis.ingotMass/1000).toFixed(1)} t`} errors={analysis.ingotErrors} />
            <AnalysisSummaryRow title={'Ores'} value={`${(analysis.oreMass/1000).toFixed(1)} t`} errors={analysis.oreErrors} />
          </List>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(styles)<AnalysisRowProps>(AnalysisSummary);