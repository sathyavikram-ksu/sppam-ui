import { Component, OnInit } from '@angular/core';
import * as ROUTES from '../../helpers/routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ROUTES = ROUTES;
  constructor() { }

  ngOnInit() {
  }

}
