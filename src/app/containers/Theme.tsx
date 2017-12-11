import * as React from 'react';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { ComponentRouted } from '../common/';
import { purple, green, red } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: purple, // Purple and green play nicely together.
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
});

class Theme extends ComponentRouted {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }

};
export default Theme;