import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';

import {Component} from "../common/";

const style = createStyleSheet('Analysis', (theme) => ({
}))

export interface AnalysisProps {
}

@withStyles(style)
export default class Analysis extends Component<AnalysisProps, {}> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p />
    );
  }

}