import * as React from 'react';
import { action, computed, observable } from 'mobx';
import {observer} from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import IconError from 'material-ui-icons/Error';

import {Component} from "../common/";
import {Analysis} from "../models/";

interface AnalysisSummaryRowProps {
  title: string;
  value: string;
  errors: [string, number][];
  subtitle?: string;
}

export type AnalysisSummaryRowClasses = 'root'|'icon'|'dialog';
const styles: StyleRulesCallback<AnalysisSummaryRowClasses> = (theme) => ({
  root: {},
  icon: {
    color: theme.palette.error[400],
    '&:hover': {
      color: theme.palette.error[800],
    }
  },
  dialog: {
    backgroundColor: theme.palette.error[50],
  }
})

@observer
class AnalysisSummaryRow extends Component<AnalysisSummaryRowProps, AnalysisSummaryRowClasses> {
  @observable dialogOpen = false;

  @action open = () => { this.dialogOpen = true; }
  @action close = () => { this.dialogOpen = false; }

  render() {
    return (
      <ListItem>
        { this.props.errors.length > 0 ?
          <ListItemIcon>
            <IconButton className={this.props.classes.icon} onClick={this.open}>
              <IconError/>
            </IconButton>
          </ListItemIcon>
        :
          null
        }
        <ListItemText primary={this.props.title} secondary={this.props.subtitle}/>
        <Typography type='body1'>{this.props.value}</Typography>
        <Dialog open={this.dialogOpen} onClose={this.close} classes={{paper:this.props.classes.dialog}}>
          <DialogTitle>Unknown {this.props.title}</DialogTitle>
          <DialogContent>
            <Typography type='body1' gutterBottom>
              There are {this.props.errors.length} unknown {this.props.title} in the blueprint.
              They are excluded from the analysis.
              If that's from mod, please wait until I add mod support.
              If that's vanilla, then please file a bug report (see Credits), thank you!
            </Typography>
            <Divider />
            <List>
            { this.props.errors.map(([name, count])=>(
              <ListItem key={name}>
                <ListItemText primary={name}/>
                <Typography type='body1'>{count} pc</Typography>
              </ListItem>
            )) }
            </List>
            <Divider />
          </DialogContent>
        </Dialog>
      </ListItem>
    );
  }

}
export default withStyles(styles)<AnalysisSummaryRowProps>(AnalysisSummaryRow);