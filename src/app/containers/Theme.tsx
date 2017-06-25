import * as React from 'react';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { ComponentRouted } from '../common/';
import createPalette from 'material-ui/styles/palette';
import { purple, green, red } from 'material-ui/styles/colors';

const theme = createMuiTheme({
  palette: createPalette({
    primary: purple, // Purple and green play nicely together.
    accent: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  }),
});

export default class Theme extends ComponentRouted<{}, {}, {}> {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }

};
