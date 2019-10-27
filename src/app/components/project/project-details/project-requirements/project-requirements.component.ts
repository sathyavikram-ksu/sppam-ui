import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.scss']
})
export class ProjectRequirementsComponent implements OnInit {
  @Input() projectId: number;
  faPlusSquare = faPlusSquare;
  private addEventSubject: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
  }

  emitAddEventToChild() {
    this.addEventSubject.next()
  }
}
