import * as React from 'react';
import {computed} from 'mobx';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { ComponentRouted } from '../common/';

export type CreditsClasses = 'root'|'content';
const styles: StyleRulesCallback<CreditsClasses> = (theme) => ({
  root: {
    padding: '0.5em',
  },
  content: {
    padding: '0.5em',
  },
})

@observer
class Credits extends ComponentRouted<{}, CreditsClasses> {

  render() {
    return (
      <Grid container spacing={16} className={this.props.classes.root}>
        <Grid item xs={12}>
          <Paper className={this.props.classes.content}>
            <Typography type='headline'>Maintainer</Typography>
            <Typography paragraph>Akuukis (
              <a href='https://steamcommunity.com/id/akuukis'>Steam</a>,
              <a href='https://github.com/Akuukis'>Github</a>,
              Discord: Akuukis#6154)
            </Typography>
            <Typography type='headline'>Contributors</Typography>
            <Typography paragraph>None yet, this started just recently.</Typography>
            <Typography type='headline'>Keen Software House</Typography>
            <Typography paragraph><a href='https://www.keenswh.com/'>You</a> are great! Thanks for making <a href='https://www.spaceengineersgame.com/'>Space Engineers</a> :)</Typography>
            <Typography paragraph>Game assets are used with Keen Software House permission in personal communication.</Typography>
            <Typography type='headline'>Bug reports</Typography>
            <Typography paragraph>Please report to <a href='https://github.com/Akuukis/spaceengineers-praisal/issues'>Github issues</a>,
              or write me personally if you don't want to signup to Github.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};
export default withStyles(styles)<{}>(Credits);
