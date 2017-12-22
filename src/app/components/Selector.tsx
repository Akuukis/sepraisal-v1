import * as React from 'react';
import {computed} from 'mobx';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { Button } from 'material-ui';

import {Component} from "../common/";
import { STORE_BLUMMARY, STORE_ANALYSIS } from '../constants/stores';
import { Blummary, BlummaryDTO } from '../models/Blummary';
import { AnalysisStore, BlummaryStore } from '../stores/index';

export type SelectorClasses = 'root'|'selected';
const styles: StyleRulesCallback<SelectorClasses> = (theme) => ({
  root: {
    padding: '0.5em',
  },
  selected: {
    background: theme.palette.primary[200],
    '&:hover': {
      background: theme.palette.primary[300],
    }
  }
})

export interface SelectorProps {
}

@inject(STORE_ANALYSIS, STORE_BLUMMARY)
@observer
class Selector extends Component<SelectorProps, SelectorClasses> {
  blummaryStore = this.props[STORE_BLUMMARY] as BlummaryStore;
  analysisStore = this.props[STORE_ANALYSIS] as AnalysisStore;

  @computed get blummaries() {
    return this.blummaryStore.map( (blummary)=>{ return {key: blummary.raw.title, title: blummary.raw.title}});
  }

  handleSelect = (event: React.MouseEvent<HTMLElement>) =>{
    this.analysisStore.add(this.blummaryStore.get(event.currentTarget.getAttribute('value')));
  }

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
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography type='subheading'>Select an existing blueprint</Typography>
            <List>
              { this.blummaries.map<JSX.Element>( (line) => (
                  <ListItem
                    button
                    key={line.key}
                    value={line.key}
                    className={computed(()=>this.analysisStore.has(line.key) ? this.props.classes.selected : '').get()}
                    onClick={this.handleSelect}
                  >
                    <ListItemText
                      primary={line.title}
                    />
                  </ListItem>
                ))
              }
            </List>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container spacing={16}>
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
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }

}
export default withStyles(styles)<SelectorProps>(Selector);