import * as React from 'react';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';

injectTapEventPlugin();

export class App extends React.Component<any, any> {

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <Paper id='container'>
          {this.props.children}
          {this.renderDevTool()}
        </Paper>
      </MuiThemeProvider>
    );
  }
};
