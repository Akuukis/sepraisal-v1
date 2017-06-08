import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Paper from 'material-ui/Paper';

@observer
export default class Home extends React.Component<{}, {}> {

  render() {
    return (
      <Paper id='content'>
        Hello world!
      </Paper>
    );
  }
};
