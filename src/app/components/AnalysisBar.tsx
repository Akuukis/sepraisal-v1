import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import {Component} from "../common/";
import {Analysis} from "../models/";

const style = createStyleSheet('Analysis', (theme) => ({
}))

export interface AnalysisProps {
  analysis: Analysis
}

@withStyles(style)
export default class AnalysisBar extends Component<AnalysisProps, {}> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          { this.props.analysis.blummary.title }
          { this.props.analysis.blummary.count }
        </Grid>
      </Grid>
    );
  }

}