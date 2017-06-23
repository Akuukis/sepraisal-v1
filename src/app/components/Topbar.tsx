import * as React from 'react';
import { observable, action } from 'mobx';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui-icons/Menu';

import * as background from '../../assets/background-wide.jpg';

const style = createStyleSheet('Topbar', (theme) => ({
  root: {
    backgroundImage: `url('${background}')`,
    backgroundPosition: '0px -12px ',
  },
}));

interface TopbarProps {
  setDrawer: (open: boolean) => void,
}

@withStyles(style)
export default class Topbar extends React.Component<TopbarProps & any, {}> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AppBar elevation={0} classes={this.props.classes}>
        <Toolbar>
          <IconButton onClick={()=>this.props.setDrawer(true)}>
            <IconMenu />
          </IconButton>
          <Typography type="headline">
            {'Space Engineers Praisal: Blueprint Parser & Analyzer'}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}
