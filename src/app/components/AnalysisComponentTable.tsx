import * as React from 'react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import List, {ListItem, ListItemText} from 'material-ui/List';

import {Component} from "../common/";
import {Analysis, AnalysisRowProps} from "../models/";
import Table from './Table';

const datumTitles = {
  type: 'Type',
  subtype: 'Subtype',
  count: 'Count',
  mass: 'Mass',
  volume: 'Volume'
}

export type AnalysisComponentTableClasses = 'root';
const styles: StyleRulesCallback<AnalysisComponentTableClasses> = (theme) => ({
  root: {}
})

class AnalysisComponentTable extends Component<AnalysisRowProps, AnalysisComponentTableClasses> {

  getData(): {[field in keyof typeof datumTitles]: number|string}[] {

    return Object.keys(this.props.analysis.componentCount).map((title)=>{
      const count = this.props.analysis.componentCount[title];
      const { type, subtype, mass, volume } = this.props.analysis.components.get(title);
      return {
          count,
          type,
          subtype,
          mass: mass * count,
          volume: volume * count
        };
    })

  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Table
            columns={Object.keys(datumTitles)}
            headers={datumTitles}
            data={this.getData()}
          />
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(styles)<AnalysisRowProps>(AnalysisComponentTable);
