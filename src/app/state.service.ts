import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _state: object = {};
  getState() {
    return this._state;
  }
  resetStateTo(data: object) {
    this._state = data;
  }
  addState(key: string, data: any) {
    this._state = { ...this._state, [key]: data };
  }

  constructor() {}
}
