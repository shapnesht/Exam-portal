import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
'import {Swal} from "sweetalert2"'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    "firstName": null,
    "lastName": null,
    "username": null,
    "email": null,
    "phoneNumber": null,
    "password" : null
  }

  submitForm() {
    if(this.user.email==null || this.user.firstName == null || this.user.lastName== null || this.user.password == null || this.user.phoneNumber== null || this.user.username== null) {
      this.snack.open("Fields Can't be empty!!", '', {
        duration:1000
      });
      return;
    }
    if(this.user.email=='' || this.user.firstName==''  || this.user.lastName==''  || this.user.password==''  || this.user.phoneNumber==''  || this.user.username=='' ) {
      this.snack.open("Fields Can't be empty!!", '', {
        duration:1000
      });
      return;
    }
    this.userService.saveUser(this.user).subscribe(
      (data:any)=>{
        Swal.fire("Success!!", "User is Successfully Registered with id = " + data.id, "success")
      }
      ,
      error=>{
        Swal.fire("Oops!!", "Something Went Wrong", "error")        
      }
    )
  }

  constructor(private snack:MatSnackBar, private userService:UserService) { }

  ngOnInit(): void {
  }

  public hide:boolean = false;
}
