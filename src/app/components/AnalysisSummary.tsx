import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import List, {ListItem, ListItemText} from 'material-ui/List';

import {Component} from "../common/";
import {Analysis, AnalysisRowProps} from "../models/";

const style = createStyleSheet('AnalysisSummary', (theme) => ({
}))

@withStyles(style)
export default class AnalysisSummary extends Component<AnalysisRowProps, {}> {

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