import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
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

const style = createStyleSheet('AnalysisIngotTable', (theme) => ({
}))

@withStyles(style)
export default class AnalysisIngotTable extends Component<AnalysisRowProps, {}> {

  getData(): {[field in keyof typeof datumTitles]: number|string}[] {

    return Object.keys(this.props.analysis.ingotCount).map((title)=>{
      const count = this.props.analysis.ingotCount[title];
      const { type, subtype } = this.props.analysis.ingots.get(title);
      return { type, subtype, count: Math.ceil(count) };
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
