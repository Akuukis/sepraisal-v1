import * as React from 'react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';

import {Component} from "../common/";
import {Analysis} from "../models/";
import AnalysisSummary from "../components/AnalysisSummary";
import AnalysisBlockTable from "../components/AnalysisBlockTable";
import AnalysisComponentTable from "../components/AnalysisComponentTable";
import AnalysisIngotTable from "../components/AnalysisIngotTable";
import AnalysisOreTable from "../components/AnalysisOreTable";

export type AnalysisColumnClasses = 'root';
const styles: StyleRulesCallback<AnalysisColumnClasses> = (theme) => ({
  root: {}
})

export interface AnalysisColumnProps {
  analysis: Analysis
}


class AnalysisColumn extends Component<AnalysisColumnProps, AnalysisColumnClasses> {

  constructor(props) {
    super(props);
  }

  renderRow(AnalysisRow: React.ComponentType<AnalysisColumnProps>) {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <Card>
          <AnalysisRow analysis={this.props.analysis} />
        </Card>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={16}>
        {this.renderRow(AnalysisSummary)}
        {this.renderRow(AnalysisBlockTable)}
        {this.renderRow(AnalysisComponentTable)}
        {this.renderRow(AnalysisIngotTable)}
        {this.renderRow(AnalysisOreTable)}
      </Grid>
    );
  }

}
export default withStyles(styles)<AnalysisColumnProps>(AnalysisColumn);