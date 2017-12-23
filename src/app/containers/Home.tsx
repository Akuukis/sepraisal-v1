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
import { STORE_BLUMMARY, STORE_ANALYSIS } from '../constants/stores';
import { BlummaryStore, AnalysisStore } from '../stores/';
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

@inject(STORE_BLUMMARY, STORE_ANALYSIS)
@observer
class Home extends ComponentRouted<{}, HomeClasses> {
  blummaryStore = this.props[STORE_BLUMMARY] as BlummaryStore;
  analysisStore = this.props[STORE_ANALYSIS] as AnalysisStore;

  @computed get disabled() { return this.analysisStore.size === 0; }

  proceed = (event: React.MouseEvent<HTMLInputElement>) => {
    this.props.router.push(ROUTES.ANALYSIS);
  }

  render() {
    return (
      <Grid container spacing={16} className={this.props.classes.root}>
        <Grid item xs={12}>
          <Paper className={this.props.classes.content}>
            <Typography paragraph>SE-Praisal is a tool to analyze your blueprints. Currently it reports required materials. Try it out below!</Typography>
            <Typography paragraph>In the future, it will also be able to
              <br />* praise your blueprints according to various popular MP servers (in credits, XP, etc.),
              <br />* measure compliance level to popular MP server grid limits,
              <br />* calculate production times,
              <br />* handle mods (and modpacks),
              <br />* do smart block analysis to report freight, production and mobility perfomance,
              <br />* and understand TIM tags for more interesting reports.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Selector classes={{root: this.props.classes.content}}>
            <Button
              raised
              color='primary'
              style={{width: '100%'}}
              disabled={this.disabled}
              onClick={this.proceed}
            >
              Continue
            </Button>
          </Selector>
        </Grid>
      </Grid>
    );
  }
};
export default withStyles(styles)<{}>(Home);
