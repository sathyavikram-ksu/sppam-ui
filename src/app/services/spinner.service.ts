import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _showSpinnerSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private readonly _showSpinnerObservable: Observable<boolean> = this._showSpinnerSubject.asObservable();

  constructor() { }

  show() {
    this._showSpinnerSubject.next(true);
  }

  hide() {
    this._showSpinnerSubject.next(false);
  }

  status() {
    return this._showSpinnerObservable;
  }
}
