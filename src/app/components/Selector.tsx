import * as React from 'react';

import {Component} from "../common/";

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';

export type SelectorClasses = 'root';
const styles: StyleRulesCallback<SelectorClasses> = (theme) => ({
  root: {}
})

export interface SelectorProps {
  lines: Array<{
    key: string,
    title: string,
  }>,
  onClick: (key: string) => void,
}

class Selector extends Component<SelectorProps, SelectorClasses> {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.MouseEvent<HTMLElement>): void {
    this.props.onClick(event.currentTarget.getAttribute('value'));
  }

  render() {
    return (
      <List>
        {
          this.props.lines.map<JSX.Element>( (line) => (
            <ListItem key={line.key} value={line.key} button onClick={this.handleClick}>
              <ListItemText
                primary={line.title}
              />
            </ListItem>
          ))
        }
      </List>
    );
  }

}
export default withStyles(styles)<SelectorProps>(Selector);