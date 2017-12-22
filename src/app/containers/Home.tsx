import * as React from 'react';
import {computed} from 'mobx';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


import { ComponentRouted } from '../common/';
import { ROUTES } from '../constants/routes';
import { STORE_BLUMMARY } from '../constants/stores';
import { BlummaryStore } from '../stores/BlummaryStore';
import Selector from '../components/Selector';

export type HomeClasses = 'root'|'content';
const styles: StyleRulesCallback<HomeClasses> = (theme) => ({
  root: {
    padding: '0.5em',
  },
  content: {
    padding: '0.5em',
  },
})

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

@inject(STORE_BLUMMARY)
@observer
class Home extends ComponentRouted<{}, HomeClasses> {

  constructor(props) {
    super(props);

    this.go = this.go.bind(this);
  }

  @computed get blummaries() {
    return (this.props[STORE_BLUMMARY] as BlummaryStore).map( (blummary)=>{ return {key: blummary.raw.title, title: blummary.raw.title}});
  }

  go(event: React.MouseEvent<HTMLInputElement>) {
    this.props.router.push(ROUTES.ANALYSIS)
  }

  render() {
    return (
      <Grid container spacing={16} className={this.props.classes.root}>
        <Grid item xs={12}>
          <Paper className={this.props.classes.content}>
            <Typography>SE-Praisal is a tool to analyze required materials for your blueprints.</Typography>
            <Typography>Furthermore, it can praise your blueprints according to various popular MP server economics.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Selector classes={{root: this.props.classes.content}}>
            <Button raised style={{width: '100%'}} color='primary' onClick={this.go}>Continue</Button>
          </Selector>
        </Grid>
      </Grid>
    );
  }
};
export default withStyles(styles)<{}>(Home);
