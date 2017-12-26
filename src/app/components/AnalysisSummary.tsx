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

  renderItem = (title, value) => <ListItem><ListItemText primary={title}/><Typography type='body1'>{value}</Typography></ListItem>

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <List>
            {this.renderItem('Title', this.props.analysis.blummary.title)}
            {this.renderItem('Block count', this.props.analysis.blockCount.toFixed(0))}
            {this.renderItem('Total Mass', this.props.analysis.blockMass.toFixed(2))}
            {this.renderItem('Component Mass', this.props.analysis.componentMass.toFixed(2))}
            {this.renderItem('Ingot Mass', this.props.analysis.ingotMass.toFixed(2))}
            {this.renderItem('Ore Mass', this.props.analysis.oreMass.toFixed(2))}
          </List>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(styles)<AnalysisRowProps>(AnalysisSummary);