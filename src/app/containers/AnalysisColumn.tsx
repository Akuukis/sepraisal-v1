import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import {Component} from "../common/";
import {Analysis} from "../models/";
import AnalysisSummary from "../components/AnalysisSummary";

const style = createStyleSheet('AnalysisColumn', (theme) => ({
}))

export interface AnalysisColumnProps {
  analysis: Analysis
}

@withStyles(style)
export default class AnalysisColumn extends Component<AnalysisColumnProps, {}> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} ><AnalysisSummary analysis={this.props.analysis} /></Grid>
      </Grid>
    );
  }

}