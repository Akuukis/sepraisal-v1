import {ObservableMap as ObservableMapMobx} from "mobx";

export class ObservableMap<TValue> extends ObservableMapMobx<TValue> {

  reduce<T>( callback: (previous: T, value: TValue, key: string)=>T, initValue: T ): T {
    let result: T = initValue;
    this.forEach((value: TValue, key: string)=>result = callback(result, value, key));
    return result;
  }

  map<T>( callback: (value: TValue, key: string)=>T ): T[] {
    const results: T[] = [];
    this.forEach((value: TValue, key: string)=>results.push(callback(value, key)));
    return results;
  }

}