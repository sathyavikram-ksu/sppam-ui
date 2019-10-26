import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from '../helpers/helpers';
import { Risk } from '../models/risk';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  constructor(private http: HttpClient) { }

  getByProject(projectId: string): Observable<Risk[]> {
    return this.http.get<Risk[]>(getUrl('risk/project/' + projectId));
  }

  addEdit(projectId: string, risk: Risk, riskId?: string) {
    if (riskId) {
      return this.http.put<Risk>(getUrl('risk/' + riskId), risk).toPromise();
    }
    return this.http.post<Risk>(getUrl('risk/project/' + projectId), risk).toPromise();
  }

  delete(riskId: string) {
    return this.http.delete(getUrl('risk/') + riskId).toPromise();
  }
}
