import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from "react-router";

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import * as RR from 'react-router';

@observer
export default class Navigation extends React.Component<{}, void> {

    render() {
        return (
            <Menu desktop={true} width={256} value={location}>
                <MenuItem ><Link to="/">Home</Link></MenuItem>
                <Divider />
                <MenuItem ><Link to="/blueprint">Blueprint</Link></MenuItem>
                <Divider />
                <MenuItem ><Link to="/mods">Manage Mods</Link></MenuItem>
                <MenuItem ><Link to="/modpacks">Manage Modpacks</Link></MenuItem>
                <Divider />
                <MenuItem ><Link to="/help">Help</Link></MenuItem>
                <MenuItem ><Link to="/credits">Credits</Link></MenuItem>
            </Menu>
        );
    }

}
