import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { DASHBOARD_ROUTE } from '../../helpers/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message = '';

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private userService: UserService,
    private router: Router,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
  }

  get validation() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.message = '';
    if (this.loginForm.valid) {
      this.spinnerService.show();
      try {
        await this.userService.
          signIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
        this.router.navigate([DASHBOARD_ROUTE]);
      } catch (error) {
        this.message = 'Incorrect Email or Password.';
      }
    } else {
      if (this.loginForm.controls.email.errors) {
        this.message = 'Valid email is required';
      } else if (this.loginForm.controls.password.errors) {
        this.message = 'Password is required';
      }
    }
    this.spinnerService.hide();
  }
}
