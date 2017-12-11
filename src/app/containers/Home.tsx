import * as React from 'react';
import {computed} from 'mobx';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { Button } from 'material-ui';


import { ComponentRouted } from '../common/';
import { STORE_BLUMMARY } from '../constants/stores';
import { BlummaryStore } from '../stores/BlummaryStore';
import Selector from '../components/Selector';

export type HomeClasses = 'root';
const styles: StyleRulesCallback<HomeClasses> = (theme) => ({
  root: {}
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
    this.props.router.push(`/blueprint`)
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <p style={{textAlign:'center'}}>Upload</p>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <p style={{textAlign:'center'}}>Analyze</p>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <p style={{textAlign:'center'}}>Compare</p>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} >
          <Selector />
          <Button color='primary' onClick={this.go}>Proceed</Button>
        </Grid>
      </Grid>
    );
  }
};
export default withStyles(styles)<{}>(Home);
