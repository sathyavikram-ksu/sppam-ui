import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { httpInterceptorProviders } from './services/auth-interceptor.service';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddEditProjectComponent } from './components/project/add-edit-project/add-edit-project.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AddEditUserComponent } from './components/user/add-edit-user/add-edit-user.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SpinnerComponent,
    AddProjectComponent,
    AddEditProjectComponent,
    UserListComponent,
    AddEditUserComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
