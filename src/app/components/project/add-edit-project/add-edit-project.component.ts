import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as ROUTES from '../../../helpers/routes';
import { UserService } from '../../../services/user.service';
import { ProjectService } from '../../../services/project.service';
import { User } from '../../../models/user';
import { Project } from '../../../models/project';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit, OnDestroy {
  ROUTES = ROUTES;
  faArrowCircleLeft = faArrowCircleLeft;
  usersList: User[];
  projectSubscription: Subscription;
  message = '';
  projectId: string;

  projectForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    description: new FormControl(''),
    owner: new FormControl('', [
      Validators.required
    ]),
    teamMembers: new FormControl()
  });

  constructor(private userService: UserService,
    private toastService: ToastService,
    private spinnerService: SpinnerService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("projectId");
    this.initProjectForm();
  }

  async initProjectForm() {
    this.spinnerService.show();
    this.usersList = await this.userService.getAllPromise();

    if (this.projectId) {
      this.projectSubscription = this.projectService.getById(this.projectId).subscribe(projectObj => {
        this.projectForm.controls.name.setValue(projectObj.name);
        this.projectForm.controls.description.setValue(projectObj.description);
        this.projectForm.controls.owner.setValue(this.usersList.find(user => user.id === projectObj.owner.id));
        let teamMembers: User[] = [];
        for (const teamMember of projectObj.teamMembers) {
          const found = this.usersList.find(user => user.id === teamMember.id);
          if (found) {
            teamMembers.push(found);
          }
        }
        this.projectForm.controls.teamMembers.setValue(teamMembers);
      });
    }
    this.spinnerService.hide();
  }

  ngOnDestroy() {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }
  async onDelete() {
    this.spinnerService.show();
    try {
      await this.projectService.delete(this.projectId);
    } catch (error) {
      this.message = 'Failed to delete Project';
    }
    this.spinnerService.hide();
    this.toastService.show('Project delete successfully !!!');
    this.router.navigate([ROUTES.DASHBOARD_ROUTE]);
  }

  async onSubmit() {
    this.message = '';
    if (this.projectForm.valid) {
      this.spinnerService.show();
      try {
        const projectObj = new Project(
          this.projectForm.controls.name.value,
          this.projectForm.controls.description.value,
          this.projectForm.controls.owner.value,
          this.projectForm.controls.teamMembers.value,
        );
        const projectResp = await this.projectService.addEdit(projectObj, this.projectId);
        this.toastService.show('Project data saved successfully !!!');
        this.router.navigate([ROUTES.PROJECT_DETAILS_ROUTE.replace(':projectId', this.projectId || '' + projectResp.id)]);
      } catch (error) {
        console.log('error = ', error);
        this.message = 'Failed to save project data';
      }
    } else {
      if (this.projectForm.controls.name.errors) {
        this.message = 'Valid name is required';
      } else if (this.projectForm.controls.owner.errors) {
        this.message = 'Project manager is required';
      }
    }
    this.spinnerService.hide();
  }
}
