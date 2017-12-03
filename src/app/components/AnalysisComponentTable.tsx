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
  weight: 'Weight',
}

const style = createStyleSheet('AnalysisAnalysisComponentTable', (theme) => ({
}))

@withStyles(style)
export default class AnalysisAnalysisComponentTable extends Component<AnalysisRowProps, {}> {

  getData(): {[field in keyof typeof datumTitles]: number|string}[] {

    return Object.keys(this.props.analysis.componentCount).map((title)=>{
      const count = this.props.analysis.componentCount[title];
      const { type, subtype, weight } = this.props.analysis.components.get(title);
      return { type, subtype, count, weight };
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
