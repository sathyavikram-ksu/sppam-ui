import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from '../helpers/helpers';
import { Requirement } from '../models/requirement';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  constructor(private http: HttpClient) { }

  getById(reqId: string): Promise<Requirement> {
    return this.http.get<Requirement>(getUrl('requirement/' + reqId)).toPromise();
  }

  getByProject(projectId: string): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(getUrl('requirement/project/' + projectId));
  }

  addEdit(projectId: string, requirement: Requirement, requirementId?: string) {
    if (requirementId) {
      return this.http.put<Requirement>(getUrl('requirement/' + requirementId), requirement).toPromise();
    }
    return this.http.post<Requirement>(getUrl('requirement/project/' + projectId), requirement).toPromise();
  }

  delete(requirementId: string) {
    return this.http.delete(getUrl('requirement/') + requirementId).toPromise();
  }
}
