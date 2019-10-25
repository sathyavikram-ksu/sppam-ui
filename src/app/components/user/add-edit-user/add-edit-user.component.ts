import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import * as ROUTES from '../../../helpers/routes';
import { SpinnerService } from '../../../services/spinner.service';
import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  ROUTES = ROUTES;
  faArrowCircleLeft = faArrowCircleLeft;
  userId: string;
  message = '';

  userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(255),
    ]),
  });

  constructor(private spinnerService: SpinnerService,
    private userService: UserService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("userId");
    if (this.userId) {
      this.userService.getById(this.userId).subscribe(user => {
        if (user && user.id) {
          this.userForm.controls.name.setValue(user.name);
          this.userForm.controls.email.setValue(user.email);
        }
      });
    }
  }
  async onDelete() {
    this.spinnerService.show();
    try {
      await this.userService.delete(this.userId);
    } catch (error) {
      this.message = 'Failed to delete user';
    }
    this.spinnerService.hide();
    this.toastService.show('User delete successfully !!!');
    this.router.navigate([ROUTES.USER_LIST_ROUTE]);
  }

  async onSubmit() {
    this.message = '';
    if (this.userForm.valid) {
      this.spinnerService.show();
      try {
        await this.userService.addEdit(new User(
          this.userForm.controls.name.value,
          this.userForm.controls.email.value,
          this.userForm.controls.password.value,
        ), this.userId);
        this.toastService.show('User data saved successfully !!!');
        this.router.navigate([ROUTES.USER_LIST_ROUTE]);
      } catch (error) {
        this.message = 'Failed to save user data';
      }
      this.spinnerService.hide();
    } else {
      if (this.userForm.controls.name.errors) {
        this.message = 'Valid name is required';
      } else if (this.userForm.controls.email.errors) {
        this.message = 'Valid email is required';
      }
    }
    this.spinnerService.hide();
  }
}
