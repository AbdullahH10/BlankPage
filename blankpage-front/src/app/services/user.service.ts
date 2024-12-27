import { User } from './../../model/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from 'src/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backendUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.backendUrl}/api/user/create`,user);
  }

  loginUser(user: User): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.backendUrl}/api/user/login`,user);
  }
}
