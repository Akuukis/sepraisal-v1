import { Component } from './Component';
import { RouteComponentProps } from 'react-router';

interface ParamsAny {
    [param:string]: string
}

export class ComponentRouted<
        Props extends {},
        State extends {},
        Params extends {}
    > extends Component<
        Props & Partial<RouteComponentProps<Params & ParamsAny, Params>>,
        State
    > {

}
