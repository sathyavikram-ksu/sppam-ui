import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as ROUTES from '../../../helpers/routes';
import { ProjectService } from '../../../services/project.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  ROUTES = ROUTES;
  faArrowCircleLeft = faArrowCircleLeft;
  faEdit = faEdit;
  
  projectId: string;
  project: Project;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("projectId");
    if (this.projectId) {
      this.projectService.getById(this.projectId).subscribe(project => {
        this.project = project;
      });
    }
  }

}
