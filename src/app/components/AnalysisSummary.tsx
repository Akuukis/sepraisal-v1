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

  renderItem = (title, value, subtitle?) => <ListItem><ListItemText primary={title} secondary={subtitle}/><Typography type='body1'>{value}</Typography></ListItem>

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <List>
            {this.renderItem('Title', this.props.analysis.blummary.title)}
            {this.renderItem('Blocks'    , `${this.props.analysis.blockCount.toFixed(0)} pc`)}
            {this.renderItem('Components', `${this.props.analysis.componentCount.toFixed(0)} pc`)}
            {this.renderItem('Weight'    , `${(this.props.analysis.blockMass/1000).toFixed(1)} t`, 'Block weight and Component weight are always equal')}
            {this.renderItem('Ingots'    , `${(this.props.analysis.ingotMass/1000).toFixed(1)} t`, 'Weight and amount are always equal, i.e. 1kg = 1pc')}
            {this.renderItem('Ores'      , `${(this.props.analysis.oreMass/1000).toFixed(1)} t`, 'Weight and amount are always equal, i.e. 1kg = 1pc')}
          </List>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(styles)<AnalysisRowProps>(AnalysisSummary);