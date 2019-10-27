import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { httpInterceptorProviders } from './services/auth-interceptor.service';
import { AddEditProjectComponent } from './components/project/add-edit-project/add-edit-project.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AddEditUserComponent } from './components/user/add-edit-user/add-edit-user.component';
import { ToastComponent } from './components/toast/toast.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { ProjectMetaComponent } from './components/project/project-details/project-meta/project-meta.component';
import { ProjectRisksComponent } from './components/project/project-details/project-risks/project-risks.component';
import { ProjectRequirementsComponent } from './components/project/project-details/project-requirements/project-requirements.component';
import { RequirementListComponent } from './components/requirement/requirement-list/requirement-list.component';
import { EffortDetailsComponent } from './components/requirement/effort-details/effort-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SpinnerComponent,
    AddEditProjectComponent,
    UserListComponent,
    AddEditUserComponent,
    ToastComponent,
    ProjectDetailsComponent,
    ProjectMetaComponent,
    ProjectRisksComponent,
    ProjectRequirementsComponent,
    RequirementListComponent,
    EffortDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
    FontAwesomeModule,
    MatNativeDateModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
