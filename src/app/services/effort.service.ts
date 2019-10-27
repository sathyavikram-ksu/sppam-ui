import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from '../helpers/helpers';
import { Effort } from '../models/effort';

@Injectable({
  providedIn: 'root'
})
export class EffortService {

  constructor(private http: HttpClient) { }

  getByRequirement(reqId: string): Observable<Effort[]> {
    return this.http.get<Effort[]>(getUrl('effort/requirement/' + reqId));
  }

  addEdit(reqId: string, effort: Effort, effortId?: string) {
    if (effortId) {
      return this.http.put<Effort>(getUrl('effort/' + effortId), effort).toPromise();
    }
    return this.http.post<Effort>(getUrl('effort/requirement/' + reqId), effort).toPromise();
  }

  delete(effortId: string) {
    return this.http.delete(getUrl('effort/') + effortId).toPromise();
  }
}
