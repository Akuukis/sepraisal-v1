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
}

export type AnalysisAnalysisBlockTableClasses = 'root';
const styles: StyleRulesCallback = (theme) => ({
  root: {}
})

class AnalysisAnalysisBlockTable extends Component<AnalysisRowProps, AnalysisAnalysisBlockTableClasses> {

  getData(): {[field in keyof typeof datumTitles]: number|string}[] {
    return this.props.analysis.blummary.blockcount.map((count, title)=>{
      const { type, subtype } = this.props.analysis.blocks.get(title);
      return { type, subtype, count };
    });
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
export default withStyles(styles)<AnalysisRowProps>(AnalysisAnalysisBlockTable);
