import * as React from 'react';
import {IComputedValue} from 'mobx';
import {observer} from 'mobx-react';

import {withStyles, StyleRulesCallback} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { Component } from '../../common/Component';

export interface ISelectorDnDOverlayProps {
  open: IComputedValue<boolean>;
}

export type SelectorDnDOverlayClasses = 'root';
const styles: StyleRulesCallback<SelectorDnDOverlayClasses> = (theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: '2.5em',
    margin: '-0.5em -0.5em 0em -0.5em',
    background: 'rgba(0,0,0,0.4)',
  }
});

@observer
class SelectorDnDOverlay extends Component<ISelectorDnDOverlayProps, SelectorDnDOverlayClasses> {

  render() {
    if(!this.props.open.get()) return null;
    return (
      <div className={this.props.classes.root}>
        <Typography style={{color: '#fff'}} align='center' type='display2'>Drop files...</Typography>
      </div>);
  }

}
export default withStyles(styles)<ISelectorDnDOverlayProps>(SelectorDnDOverlay);
