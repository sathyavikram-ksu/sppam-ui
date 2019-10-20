import { Component, OnInit } from '@angular/core';
import { ToastService, ToastConfig } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toastConfig: ToastConfig;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    (window as any).jQuery('#appToast').toast({});

    this.toastService.status().subscribe((toastConfig: ToastConfig) => {
      this.toastConfig = toastConfig;
      (window as any).jQuery('#appToast').toast(this.toastConfig.isShow ? 'show' : 'hide');
    });
  }

}
