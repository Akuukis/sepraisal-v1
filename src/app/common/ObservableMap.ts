import {ObservableMap as ObservableMapMobx} from "mobx";

export class ObservableMap<TValue> extends ObservableMapMobx<TValue> {

  reduce<T>( callback: (previous: T, value: TValue, key: string)=>T, initValue: T ): T {
    this.forEach((value: TValue, key: string)=>callback(initValue, value, key));
    return initValue;
  }

  map<T>( callback: (value: TValue, key: string)=>T ): T[] {
    const results: T[] = [];
    this.forEach((value: TValue, key: string)=>results.push(callback(value, key)));
    return results;
  }

}