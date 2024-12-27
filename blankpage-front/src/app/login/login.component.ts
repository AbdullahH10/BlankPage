import { Token } from './../../model/token.model';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService) { }

  user: User = {
    userName: "",
    password: ""
  };

  status: string = "";
  isSuccessHidden: boolean = true;
  isErrorHidden: boolean = true;

  ngOnInit(): void {
    if (this.cookieService.check('userId') == true &&
      this.cookieService.check('token') == true) {
      this.router.navigate(['/inbox']);
    }
  }

  authenticateUser(): void {
    this.userService
      .loginUser(this.user)
      .subscribe(
        (response) => {
          this.status = response.status;
          if (response.status === "User logged in successfully.") {
            this.isErrorHidden = true;
            this.isSuccessHidden = false;
            const token: Token = response.data;
            this.cookieService.set('userId', token.userId);
            this.cookieService.set('token', token.token);
            setTimeout(
              () => {
                this.router.navigate(['/inbox']);
              }, 500
            );
            return;
          }
          this.isSuccessHidden = true;
          this.isErrorHidden = false;
        }
      );
  }

}