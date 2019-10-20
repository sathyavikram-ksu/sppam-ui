import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ToastType = 'secondary' | 'danger';

export interface ToastConfig {
  isShow?: boolean;
  message?: string;
  type?: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _showToastSubject: BehaviorSubject<ToastConfig> = new BehaviorSubject({
    isShow: false,
    message: '',
    type: 'secondary'
  });
  private readonly _showToastObservable: Observable<ToastConfig> = this._showToastSubject.asObservable();

  constructor() { }

  show(nessage: string, toastType: ToastType = 'secondary') {
    this._showToastSubject.next({
      isShow: true,
      message: nessage,
      type: toastType
    });
  }

  hide() {
    this._showToastSubject.next({
      isShow: false
    });
  }

  status() {
    return this._showToastObservable;
  }
}
