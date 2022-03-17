import { Router } from '@angular/router';
import { User } from 'src/model/user.model';
import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/model/message.model';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {

  constructor(private messageService: MessageService, private router: Router) { }

  date: Date = new Date();
  user: User = {};
  message: Message = {
    time: this.date.getTime(),
    date: this.date.getDate(),
    messageBody: ""
  };
  messageStatus: string = "";

  ngOnInit(): void {
  }

  sendMessage() : void {
    this.user.messages = [this.message];
    this.messageService.sendMessage(`${this.user.id}`,this.user).subscribe(
      data => {
        if(data !== undefined) {
          this.messageStatus = "Message sent successfully.";
          let element = document.getElementById("success_message");
          element?.classList.remove("hidden");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else {
          this.messageStatus = "Something went wrong.";
          let element = document.getElementById("error_message");
          element?.classList.remove("hidden");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    );
  }

}
