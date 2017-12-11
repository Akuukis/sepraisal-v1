import * as React from 'react';
import { observable, action } from 'mobx';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui-icons/Menu';

import {Component} from '../common/';

import * as background from '../../assets/background-wide.jpg';

export type TopbarClasses = 'root'|'appbar'|'headline';
const styles: StyleRulesCallback<TopbarClasses> = (theme) => ({
  root: {},
  appbar: {
    backgroundImage: `url('${background}')`,
    backgroundPosition: '0px -12px ',
  },
  headline: {
    color: 'white',
  }
});

interface TopbarProps {
  setDrawer: (open: boolean) => void,
}


class Topbar extends Component<TopbarProps, TopbarClasses> {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AppBar elevation={0} className={this.props.classes.appbar}>
        <Toolbar>
          <IconButton onClick={()=>this.props.setDrawer(true)}>
            <IconMenu />
          </IconButton>
          <Typography type="headline" className={this.props.classes.headline}>
            {'Space Engineers Praisal: Blueprint Parser & Analyzer Hello World'}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}
export default withStyles(styles)<TopbarProps>(Topbar);
