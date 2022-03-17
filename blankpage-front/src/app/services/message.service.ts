import { User } from 'src/model/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  backendUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getMessages(user: User) : Observable<User>{
    return this.http.post(`${this.backendUrl}/getMessages/`,user);
  }

  sendMessage(id: string, user: User): Observable<any> {
    return this.http.post(`${this.backendUrl}/sendMessage/${id}`,user);
  }
}
