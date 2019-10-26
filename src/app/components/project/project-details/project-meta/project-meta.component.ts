import { Component, Input } from '@angular/core';
import { Project } from '../../../../models/project';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import * as ROUTES from '../../../../helpers/routes';

@Component({
  selector: 'app-project-meta',
  templateUrl: './project-meta.component.html',
  styleUrls: ['./project-meta.component.scss']
})
export class ProjectMetaComponent {
  @Input() project: Project;
  faEdit = faEdit;
  ROUTES = ROUTES;
}
