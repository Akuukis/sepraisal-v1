import { observable, computed, action } from 'mobx';
import { TodoModel } from '../models';

export class NavigationStore {

  constructor() {
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  @observable public isDrawerOpen: boolean = false;

  @action openDrawer(): void { this.isDrawerOpen = true };
  @action closeDrawer(): void { this.isDrawerOpen = false };

}

export default NavigationStore;
