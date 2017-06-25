import * as React from 'react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';

const style = createStyleSheet('Selector', (theme) => ({
}))

export interface SelectorProps {
  lines: Array<{
    key: string,
    title: string,
  }>,
  onClick: (key: string) => void,
}

@withStyles(style)
export default class Selector extends React.Component<SelectorProps, {}> {

  constructor(props) {
    super(props);

    this.handleTouch = this.handleTouch.bind(this);
  }

  handleTouch(event: React.TouchEvent<HTMLElement>): void {
    this.props.onClick(event.currentTarget.getAttribute('value'));
  }

  render() {
    return (
      <List>
        {
          this.props.lines.map<JSX.Element>( (line) => (
            <ListItem key={line.key} value={line.key} button onTouchTap={this.handleTouch}>
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