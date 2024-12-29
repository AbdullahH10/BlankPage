import { User } from 'src/model/user.model';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    userName: "",
    password: ""
  };

  isSuccessHidden: boolean = true;
  isErrorHidden: boolean = true;
  status: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if (this.cookieService.check('id') == true || this.cookieService.check('email') == true) {
      this.router.navigate(['/inbox/']);
    }
  }

  createUser(): any {
    if(this.user.userName !== "" && this.user.password !== ""){
      this.userService.createUser(this.user).subscribe(
        (response) => {
          this.status = response.status;
          if (this.status === "User created successfully") {
            this.isErrorHidden = true;
            this.isSuccessHidden = false;
            setTimeout(
              () => {
                this.router.navigate(['login']);
              }, 2000
            );
            return;
          }
          this.isErrorHidden = false;
            this.isSuccessHidden = true;
        }
      );
    }
  }
}