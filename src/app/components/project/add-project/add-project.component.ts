import { Component, OnInit } from '@angular/core';
import { DASHBOARD_ROUTE } from '../../../helpers/routes';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  DASHBOARD_ROUTE = DASHBOARD_ROUTE;
  constructor() { }

  ngOnInit() {
  }

}
