import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.scss']
})
export class ProjectRequirementsComponent implements OnInit {
  @Input() projectId: number;

  constructor() { }

  ngOnInit() {
  }

}
