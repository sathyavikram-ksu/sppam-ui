import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, finalize } from 'rxjs/operators';
import * as ROUTES from '../../helpers/routes';
import { SpinnerService } from '../../services/spinner.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ROUTES = ROUTES;
  projects$: Observable<Project[]>;
  hasError$: Observable<boolean>;
  constructor(private projectService: ProjectService, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.projects$ = this.projectService.getByUser();
    this.hasError$ = this.projects$.pipe(
      mapTo(false),
      catchError(err => of(true)),
      finalize(() => this.spinnerService.hide())
    );
  }

}
