import { Message } from './../../model/message.model';
import { User } from 'src/model/user.model';
import { MessageService } from './../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/model/token.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  domain: string = environment.DOMAIN;

  token: Token = {
    userId: "",
    token: ""
  };

  status: string = "";
  messages: Message[] = [];

  shareableLink: string = "";

  isHidden: boolean = true;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    if(this.cookieService.check('userId') == true && 
    this.cookieService.check('token') == true) {
      this.token.userId = this.cookieService.get('userId');
      this.token.token = this.cookieService.get('token');
      this.shareableLink = this.domain+"/message/"+this.token.userId;
      this.getMessages();
    }
    else{
      this.router.navigate(['/login']);
    }
  }


  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  getMessages(): void {
    this.messageService
    .getMessages(this.token)
    .subscribe(
      (response) => {
        this.status = response.status;
        if(this.status.includes("messages found.")){
          this.messages = response.data;
        }
      }
    );
  }

  copyLinkToClipboard(): void {
    navigator.clipboard.writeText(this.shareableLink);
    this.isHidden = false;
    setTimeout(
      () => {
        this.isHidden =true
      },300
    )
  }

}
