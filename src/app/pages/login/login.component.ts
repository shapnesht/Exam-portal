import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginData = {
    username: '',
    password: ''
  };

  sendLoginData() {
    if(this.loginData.username==null || this.loginData.username.trim()=='') {
      this.snack.open("Username Can't be Empty!!", "OK", {
        duration:3000,
      })
      return;
    }
    if(this.loginData.password==null || this.loginData.password.trim()=='') {
      this.snack.open("Password Can't be Empty!!", "OK", {
        duration:3000,
      })
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user:any)=> {
            this.loginService.setUser(user);
            console.log(user);
            // Redirect ADMIN-dashboard
            // Redirect NORMAL-dashboard
            if (this.loginService.getUserRole() == "ADMIN") {
              // Admin Dashboard
              this.route.navigate(["admin"]);
            } else if (this.loginService.getUserRole() == "NORMAL"){
              // Normal User Dashboard
              this.route.navigate(["user-dashboard"]);
              // window.location.href = "/user-dashboard"
            } else {
              this.loginService.logout();
            }
          },
          error=>{
            console.log(error);
          }
        )
      },
      error=>{
        console.log(error);
      }
    )
  }

  public hide: boolean = true;

  constructor(private snack:MatSnackBar, private loginService:LoginService, private route:Router) {}

  ngOnInit(): void {}
}
