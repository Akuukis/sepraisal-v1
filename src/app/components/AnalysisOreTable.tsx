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

export type AnalysisOreTableClasses = 'root';
const styles: StyleRulesCallback<AnalysisOreTableClasses> = (theme) => ({
  root: {}
})

class AnalysisOreTable extends Component<AnalysisRowProps, AnalysisOreTableClasses> {

  getData(): {[field in keyof typeof datumTitles]: number|string}[] {

    return Object.keys(this.props.analysis.oreCount).map((title)=>{
      const count = this.props.analysis.oreCount[title];
      const { type, subtype, mass, volume } = this.props.analysis.ores.get(title);
      return {
        type,
        subtype,
        count: Math.ceil(count),
        mass: mass * count,
        volume: volume * count,
      };
    })

  }

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
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
export default withStyles(styles)<AnalysisRowProps>(AnalysisOreTable);
