import { Component } from './Component';
import { RouteComponentProps } from 'react-router';

interface ParamsAny {
    [param: string]: string;
}

export class ComponentRouted<
        Props extends object = object,
        StyleClassNames extends string = undefined,
        Params extends object = object
    > extends Component<
        Props & Partial<RouteComponentProps<Params & ParamsAny, Params>>,
        StyleClassNames
    > {

}
