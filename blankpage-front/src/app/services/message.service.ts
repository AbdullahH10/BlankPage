import { User } from 'src/model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/model/message.model';
import { ResponseDTO } from 'src/model/response.model';
import { Token } from 'src/model/token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  backendUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  sendMessage(userId: string, message: Message): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.backendUrl}/api/message/post/${userId}`,message);
  }

  getMessages(token: Token) : Observable<ResponseDTO>{
    return this.http.get<ResponseDTO>(
      `${this.backendUrl}/api/message/get/${token.userId}`,
      {
        headers: new HttpHeaders(
          {
            token: token.token
          }
        ) 
      }
    );
  }
}
