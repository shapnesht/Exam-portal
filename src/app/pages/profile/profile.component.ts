import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = null;

  constructor(private login:LoginService) { }

  ngOnInit(): void {
    // from localstorage
    this.user = this.login.getUser();

    // from server
    // this.login.getCurrentUser().subscribe(
    //   (data:any)=> {
    //     this.user = data;
    //   },
    //   error=>{
    //     alert("Server Not Up!!");
    //   }
    // )
  }

}
