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

  constructor(private router: Router, private cookieService:CookieService, private userService: UserService) { }

  user: User = {};
  dbUser: User = {};

  ngOnInit(): void {
    if(this.cookieService.check('id') == true || this.cookieService.check('email') == true) {
      this.router.navigate(['/inbox/']);
    }
  }

  validateUser(): void {
    this.userService.getUser(this.user).subscribe(
      data => {
        this.dbUser = data;

        if(this.dbUser!=null && this.dbUser.email === this.user.email && this.dbUser.password === this.user.password) {
          this.cookieService.set('id',`${this.dbUser.id}`);
          this.cookieService.set('email',`${this.dbUser.email}`);
          this.router.navigate(['/inbox/'])
        }

        else{
          let element = document.getElementById("error_message");
          element?.classList.remove("hidden");
        }
      }
    )
  }

}
