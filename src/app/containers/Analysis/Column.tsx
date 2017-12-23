import * as React from 'react';

import { StyleRulesCallback, withStyles, StyledComponentProps } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconClose from 'material-ui-icons/Close';
import IconMenu from 'material-ui-icons/Menu';

import {Component} from "../../common/";
import {Analysis, AnalysisRowProps} from "../../models/";
import AnalysisSummary from "../../components/AnalysisSummary";
import AnalysisBlockTable from "../../components/AnalysisBlockTable";
import AnalysisComponentTable from "../../components/AnalysisComponentTable";
import AnalysisIngotTable from "../../components/AnalysisIngotTable";
import AnalysisOreTable from "../../components/AnalysisOreTable";

export type AnalysisColumnClasses = 'root';
const styles: StyleRulesCallback<AnalysisColumnClasses> = (theme) => ({
  root: {},
})

export interface AnalysisColumnProps {
  width: 1|2|3|4|6|12;
  analysis: Analysis;
  remove: ()=>any;
}


class AnalysisColumn extends Component<AnalysisColumnProps, AnalysisColumnClasses> {

  renderRow(AnalysisRow: React.ComponentType<AnalysisRowProps & StyledComponentProps<'root'>>) {
    return (
      <Grid item xs={12}>
        <Paper>
          <AnalysisRow analysis={this.props.analysis} />
        </Paper>
      </Grid>
    );
  }

  render() {
    return (
      <Grid item xs={this.props.width} key={this.props.analysis.blummary.title}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <AppBar position='static'>
              <Toolbar>
                {/* <IconButton color='contrast' aria-label='Menu'>
                  <IconMenu />
                </IconButton> */}
                <Typography type='title' color='inherit' style={{flex: 1}}>
                  {this.props.analysis.blummary.title} ({this.props.analysis.blummary.count})
                </Typography>
                <IconButton color='contrast' onClick={this.props.remove} aria-label='remove'>
                  <IconClose />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Paper>
            </Paper>
          </Grid>
          {this.renderRow(AnalysisSummary)}
          {this.renderRow(AnalysisBlockTable)}
          {this.renderRow(AnalysisComponentTable)}
          {this.renderRow(AnalysisIngotTable)}
          {this.renderRow(AnalysisOreTable)}
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(styles)<AnalysisColumnProps>(AnalysisColumn);