import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from '../helpers/helpers';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  addEdit(project: Project, projectId?: string) {
    if (projectId) {
      return this.http.put<Project>(getUrl('project/' + projectId), project).toPromise();
    }
    return this.http.post<Project>(getUrl('project'), project).toPromise();
  }

  getByUser(): Observable<Project[]> {
    return this.http.get<Project[]>(getUrl('project/byuser'));
  }

  getById(projectId: string): Observable<Project> {
    return this.http.get<Project>(getUrl('project/' + projectId));
  }
}
