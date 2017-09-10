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

const style = createStyleSheet('AnalysisAnalysisComponentTable', (theme) => ({
}))

@withStyles(style)
export default class AnalysisAnalysisComponentTable extends Component<AnalysisRowProps, {}> {

  getData(): {[field in keyof typeof datumTitles]: number|string}[] {
    const components = this.props.analysis.blummary.blockcount.reduce<{[title: string]: number}>((components, count, title)=>{
        const { prerequisites } = this.props.analysis.blocks.get(title);
        for(let [title, required] of Object.entries(prerequisites)) {
          components[title] = count * required + (title in components ? components[title] : 0);
        }
        return components;
      }, Object.create(null));

    return Object.keys(components).map((title)=>{
      const count = components[title];
      const { type, subtype } = this.props.analysis.components.get(title);
      return { type, subtype, count };
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
