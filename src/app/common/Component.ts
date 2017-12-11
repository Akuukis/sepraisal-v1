import { Component as ReactComponent} from 'react';
import { WithStyles } from 'material-ui/styles';

export default function returnof<T>(fn: () => T): T { return undefined; }

export abstract class Component<
        Props extends object = object,
        StyleClassNames extends string = ''
    > extends ReactComponent<
        Props & WithStyles<StyleClassNames>,
        {}
    > {

}
