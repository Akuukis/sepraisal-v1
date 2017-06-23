import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const style = createStyleSheet('Home', (theme) => ({
}));

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

@withStyles(style)
@observer
export default class Home extends React.Component<any, {}> {
  intervalId: number;

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={8} ><p style={{backgroundColor:'blue'}}>Hello!</p></Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} ><p style={{backgroundColor:'blue'}}>Hello!</p></Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} ><p style={{backgroundColor:'blue'}}>Hello!</p></Grid>
      </Grid>
    );
  }
};
