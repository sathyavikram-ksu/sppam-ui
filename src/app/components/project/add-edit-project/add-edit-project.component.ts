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
  userSubscription: Subscription;
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
    private router: Router
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.getAll().subscribe(users => this.usersList = users);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
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
        await this.projectService.addEdit(projectObj, this.projectId);
        this.toastService.show('Project data saved successfully !!!');
        this.router.navigate([ROUTES.DASHBOARD_ROUTE]);
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
