import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AddEditUserComponent } from './components/user/add-edit-user/add-edit-user.component';
import { AddEditProjectComponent } from './components/project/add-edit-project/add-edit-project.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';

import * as ROUTES from './helpers/routes';

const routes: Routes = [
  { path: ROUTES.HOME_ROUTE, component: LoginComponent },
  { path: ROUTES.DASHBOARD_ROUTE, component: DashboardComponent },

  { path: ROUTES.USER_LIST_ROUTE, component: UserListComponent },
  { path: ROUTES.ADD_USER_ROUTE, component: AddEditUserComponent },
  { path: ROUTES.EDIT_USER_ROUTE, component: AddEditUserComponent },

  { path: ROUTES.ADD_PROJECT_ROUTE, component: AddEditProjectComponent },
  { path: ROUTES.EDIT_PROJECT_ROUTE, component: AddEditProjectComponent },
  { path: ROUTES.PROJECT_DETAILS_ROUTE, component: ProjectDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
