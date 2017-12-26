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
    return this.props.analysis.components.map(([component, count])=>({
        type: component.type,
        subtype: component.subtype,
        count: Math.round(count),
        mass: Math.round(component.mass * count),
        volume: Math.round(component.volume * count)
    }))
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
export default withStyles(styles)<AnalysisRowProps>(AnalysisComponentTable);
