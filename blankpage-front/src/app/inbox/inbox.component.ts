import { Message } from './../../model/message.model';
import { User } from 'src/model/user.model';
import { MessageService } from './../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private messageService: MessageService) { }

  user: User = {};
  messages: Message[] | undefined =[];

  ngOnInit(): void {
    this.user.id = this.cookieService.get('id');
    this.user.email = this.cookieService.get('email');

    this.getMessages();
  }


  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/login/']);
  }

  getMessages(): void {
    this.messageService.getMessages(this.user).subscribe(
      data => {
        this.user = data;
        this.messages = this.user.messages;
        console.log("Hi, "+this.user.id+"->"+this.user);
      }
    )
  }

}
