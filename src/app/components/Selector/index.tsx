import * as React from 'react';
import {computed} from 'mobx';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { Button } from 'material-ui';

import {Component} from "../../common/";
import { STORE_BLUMMARY, STORE_ANALYSIS } from '../../constants/stores';
import { Blummary, BlummaryDTO } from '../../models/Blummary';
import { AnalysisStore, BlummaryStore } from '../../stores/index';

import SelectorRow from './Row';

export type SelectorClasses = 'root';
const styles: StyleRulesCallback<SelectorClasses> = (theme) => ({
  root: {
    padding: '0.5em',
  }
})

export interface SelectorProps {
}

@inject(STORE_ANALYSIS, STORE_BLUMMARY)
@observer
class Selector extends Component<SelectorProps, SelectorClasses> {
  blummaryStore = this.props[STORE_BLUMMARY] as BlummaryStore;
  analysisStore = this.props[STORE_ANALYSIS] as AnalysisStore;

  handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const blob = event.target.files.item(0);
      const reader = new FileReader();
      const onloadPromise = new Promise((resolve: (res:string)=>void ) => {
          reader.onload = (e: ProgressEvent) => {
              const r: any = e.target;  // TODO fix typings
              resolve(r.result);
          };
      });
      reader.readAsText(blob, 'utf8');
      this.blummaryStore.add(new Blummary(await Blummary.parseBlueprintXml(await onloadPromise)));
  }

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <Typography type='headline'>Select a blueprint</Typography>
        <Grid container spacing={16} alignItems='stretch'>
          <Grid item xs={12} sm={6} md={6} style={{height: '100%'}}>
            <Typography type='subheading'>Available blueprints</Typography>
            <List dense>
              { this.blummaryStore.map<JSX.Element>( (blummary) => <SelectorRow key={blummary.raw.title} blummary={blummary} /> ) }
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Grid container spacing={16} justify='space-between' style={{height: '100%'}}>
              <Grid item xs={12}>
                <Typography type='subheading'>Upload a new blueprint..</Typography>
                <Button>
                  <input type='file' onChange={this.handleFile} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography type='subheading'>Link to blueprint in internet</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography type='subheading'>Create new empty blueprint</Typography>
              </Grid>
              <Grid item xs={12}>
                { this.props.children }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

}
export default withStyles(styles)<SelectorProps>(Selector);