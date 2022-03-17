import { User } from './../../model/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backendUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  setUser(user: User): Observable<any> {
    return this.http.post(`${this.backendUrl}/setUser/`,user);
  }

  getUser(user: User): Observable<any> {
    return this.http.post(`${this.backendUrl}/getUser/`,user);
  }
}
