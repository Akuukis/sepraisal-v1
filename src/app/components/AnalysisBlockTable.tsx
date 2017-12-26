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

export type AnalysisAnalysisBlockTableClasses = 'root';
const styles: StyleRulesCallback = (theme) => ({
  root: {}
})

class AnalysisAnalysisBlockTable extends Component<AnalysisRowProps, AnalysisAnalysisBlockTableClasses> {

  getData(): {[field in keyof typeof datumTitles]: number|string}[] {
    return this.props.analysis.blocks.map(([block, count])=>({
        type: block ? block.type : '**Unknown block**',
        subtype: block ? block.subtype : `"${block.title}"`,
        count: Math.round(count),
        mass: Math.round(block.mass * count),
        volume: Math.round(block.volume * count)
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
export default withStyles(styles)<AnalysisRowProps>(AnalysisAnalysisBlockTable);
