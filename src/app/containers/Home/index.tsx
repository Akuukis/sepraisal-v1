import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Grid from 'material-ui/Grid';

import Paper from 'material-ui/Paper';

@observer
export default class Home extends React.Component<{}, {}> {

  render() {
    return (
      <Paper id='content'>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={8} ><p style={{backgroundColor:'blue'}}>Hello!</p></Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} ><p style={{backgroundColor:'blue'}}>Hello!</p></Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} ><p style={{backgroundColor:'blue'}}>Hello!</p></Grid>
        </Grid>
      </Paper>
    );
  }
};
