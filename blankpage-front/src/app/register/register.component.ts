import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { User } from './../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : User = {};
  signupStatus: boolean = true;
  showMessage: string = "";

  constructor(private router: Router, private userService: UserService, private cookieService:CookieService) {
   }

  ngOnInit(): void {
    if(this.cookieService.check('id') == true || this.cookieService.check('email') == true) {
      this.router.navigate(['/inbox/']);
    }
  }

  setUser(): any {
    this.userService.setUser(this.user).subscribe(
      data => {
        this.signupStatus = data;

        if(this.signupStatus == true) {
          this.showMessage = "User registered successfully.";
          let element = document.getElementById("success_message");
          element?.classList.remove("hidden");
          this.cookieService.set('email',`${this.user.email}`);
          this.router.navigate(['/inbox/']);
        }
    
        else {
          this.showMessage = "Email already registered. Try to login."
          let element = document.getElementById("error_message");
          element?.classList.remove("hidden");
        }

      }
    );
  }
}