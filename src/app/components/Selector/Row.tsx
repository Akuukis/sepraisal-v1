import * as React from 'react';
import {action, observable, computed, IReactionDisposer} from 'mobx';
import {observer, inject} from 'mobx-react';

import {withStyles, StyleRulesCallback} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconDeleteForever from 'material-ui-icons/DeleteForever';
import IconEdit from 'material-ui-icons/Edit';

import { ComponentRouted } from '../../common/ComponentRouted';
import { STORE_BLUMMARY, STORE_ANALYSIS } from '../../constants/stores';
import { Blummary } from '../../models/Blummary';
import { AnalysisStore, BlummaryStore } from '../../stores/index';

function formatSecondaryLine(blummary: Blummary): string {
  return `${blummary.raw.title}, ${blummary.count} blocks`;
}

export interface ISelectorRowProps {
  blummary: Blummary;
  // edit: (secretName: string)=>void;
}

export type SelectorRowClasses = 'root'|'selected';
const styles: StyleRulesCallback<SelectorRowClasses> = (theme) => ({
  root: {},
  selected: {
    background: theme.palette.primary[200],
    '&:hover': {
      background: theme.palette.primary[300],
    }
  }
});

@inject(STORE_ANALYSIS, STORE_BLUMMARY)
@observer
class SelectorRow extends ComponentRouted<ISelectorRowProps, SelectorRowClasses> {
  blummaryStore = this.props[STORE_BLUMMARY] as BlummaryStore;
  analysisStore = this.props[STORE_ANALYSIS] as AnalysisStore;

  @computed get id() { return this.props.blummary.raw.title; }

  @action handleToggle = () => this.analysisStore.has(this.id) ? this.analysisStore.delete(this.id) : this.analysisStore.add(this.props.blummary);
  @action handleDelete = () => this.blummaryStore.delete(this.id);
  // handleEdit = () => this.props.edit(this.props.key);

  render() {
    return (
      <ListItem
        button
        key={this.id}
        value={this.id}
        className={this.analysisStore.has(this.id) ? this.props.classes.selected : ''}
        onClick={this.handleToggle}
      >
        <ListItemText
          primary={this.id}
          secondary={formatSecondaryLine(this.blummaryStore.get(this.id))}
        />
        <ListItemSecondaryAction>
          {/* <IconButton onClick={this.handleEdit} ><IconEdit /></IconButton> */}
          <IconButton onClick={this.handleDelete} ><IconDeleteForever /></IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

}
export default withStyles(styles)<ISelectorRowProps>(SelectorRow);
