import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.status().subscribe(show => {
      (window as any).jQuery('#myModal').modal(show ? 'show' : 'hide');
    });
  }
}
