import { Component as ReactComponent} from 'react';

export abstract class Component<
    Props extends {},
    State extends {}
  > extends ReactComponent<
    Props & Partial<{classes: {[className: string]: string}}>,  // hack for material-ui @withStyle().
    State
  > {

}
