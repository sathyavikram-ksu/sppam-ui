import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AddEditUserComponent } from './components/user/add-edit-user/add-edit-user.component';
import * as ROUTES from './helpers/routes';

const routes: Routes = [
  { path: ROUTES.HOME_ROUTE, component: LoginComponent },
  { path: ROUTES.DASHBOARD_ROUTE, component: DashboardComponent },
  { path: ROUTES.ADD_PROJECT_ROUTE, component: AddProjectComponent },
  { path: ROUTES.USER_LIST_ROUTE, component: UserListComponent },
  { path: ROUTES.ADD_USER_ROUTE, component: AddEditUserComponent },
  { path: ROUTES.EDIT_USER_ROUTE, component: AddEditUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
