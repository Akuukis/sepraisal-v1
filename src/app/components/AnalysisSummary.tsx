import * as React from 'react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import List, {ListItem, ListItemText} from 'material-ui/List';

import {Component} from "../common/";
import {Analysis, AnalysisRowProps} from "../models/";

export type AnalysisSummaryClasses = 'root';
const styles: StyleRulesCallback<AnalysisSummaryClasses> = (theme) => ({
  root: {}
})

class AnalysisSummary extends Component<AnalysisRowProps, AnalysisSummaryClasses> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <List>
            <ListItem><ListItemText primary='Title' />{ this.props.analysis.blummary.title }</ListItem>
            <ListItem><ListItemText primary='Block count' />{ this.props.analysis.blummary.count }</ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(styles)<AnalysisRowProps>(AnalysisSummary);