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
    return this.props.analysis.oreEntries.map(([ore, count])=>({
        type: ore.type,
        subtype: ore.subtype,
        count: Math.round(count),
        mass: Math.round(ore.mass * count),
        volume: Math.round(ore.volume * count)
    }));
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
