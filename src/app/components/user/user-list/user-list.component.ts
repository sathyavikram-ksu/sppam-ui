import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, finalize } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import * as ROUTES from '../../../helpers/routes';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  ROUTES = ROUTES;
  constructor(private userService: UserService, private spinnerService: SpinnerService) { }
  users$: Observable<User[]>;
  hasError$: Observable<boolean>;

  ngOnInit() {
    this.spinnerService.show();
    this.users$ = this.userService.getAll();
    this.hasError$ = this.users$.pipe(
      mapTo(false),
      catchError(err => of(true)),
      finalize(() => this.spinnerService.hide())
    );
  }
}
