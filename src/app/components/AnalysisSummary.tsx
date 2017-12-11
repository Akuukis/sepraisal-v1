import * as React from 'react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
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
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <List>
            <ListItem><ListItemText primary='Title' /><Typography type='body1'>{ this.props.analysis.blummary.title }</Typography></ListItem>
            <ListItem><ListItemText primary='Block count' /><Typography type='body1'>{ this.props.analysis.blummary.count }</Typography></ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(styles)<AnalysisRowProps>(AnalysisSummary);