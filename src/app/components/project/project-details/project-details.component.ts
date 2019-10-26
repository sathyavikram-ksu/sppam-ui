import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as ROUTES from '../../../helpers/routes';
import { Project } from 'src/app/models/project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  ROUTES = ROUTES;
  faArrowCircleLeft = faArrowCircleLeft;
  projectId: string;
  project: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("projectId");
    this.projectService.getById(this.projectId).subscribe(project => {
      this.project = project;
    });
  }
}
