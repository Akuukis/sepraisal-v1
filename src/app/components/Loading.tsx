import * as React from 'react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';

import {Component} from "../common/";

export type LoadingClasses = 'root';
const styles: StyleRulesCallback<LoadingClasses> = (theme) => ({
  root: {}
})

class Loading extends Component<{}, LoadingClasses> {

  render() {
    return (
      <p>Loading...</p>
    );
  }

}
export default withStyles(styles)<{}>(Loading);