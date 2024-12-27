import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/model/user.model';
import { MessageService } from '../services/message.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/model/message.model';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    
    userId: string = "";
    messageDTO: Message = {
        message: ""
    };
    status: string = "";

    isSuccessHidden: boolean = true;
    isErrorHidden: boolean = true;

    constructor(
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
    }

    sendMessage(): void {
        this.activatedRoute.params.subscribe(
            (params) => {
                this.userId = params['userId'];
            }
        )
        this.messageService
        .sendMessage(this.userId,this.messageDTO)
        .subscribe(
            (response) => {
                this.status = response.status;
                if(this.status === 'Message sent.'){
                    this.isErrorHidden = true;
                    this.isSuccessHidden = false;
                    this.reloadWindow();
                    return;
                }
                this.isSuccessHidden = true;
                this.isErrorHidden = false;
                this.reloadWindow();
            }
        );
    }

    reloadWindow(): void {
        setTimeout(
            () => {
                window.location.reload();
            },2000
        );
    }

}
