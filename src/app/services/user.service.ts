import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from '../helpers/helpers';
import { ACCESS_TOKEN } from '../helpers/helpers';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async signIn(email: string, password: string) {
    const response = await this.http.post<{ accessToken: string }>(getUrl('auth/signin'), {
      email: email,
      password: password
    }).toPromise();
    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(getUrl('user'));
  }

  addEdit(user: User, userId?: string) {
    if (userId) {
      return this.http.put<User>(getUrl('user/' + userId), user).toPromise();
    }
    return this.http.post<User>(getUrl('user'), user).toPromise();
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(getUrl('user/' + id));
  }

  delete(userId: string) {
    return this.http.delete(getUrl('user/') + userId).toPromise();
  }
}