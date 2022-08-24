import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  // Current user details
  public getCurrentUser() {
    return this.http.get(`${baseurl}/current-user`);
  }

  public generateToken(loginData: any) {
    return this.http.post(`${baseurl}/generate-token`, loginData);
  }

  // To login user and store token in localstorage
  public loginUser(token:any) {
    localStorage.setItem("token", token);
    return true;
  }

  // To check if token is there ie: user is logged in.
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == null || tokenStr == '') {
      return false;
    } else {
      return true;
    }
  }
  
  // Logout - remove the token
  public logout() {
    localStorage.removeItem("token");
    return true;
  }
  
  // get Token
  public getToken() {
    return localStorage.getItem("token");
  }
  
  // set User Details
  public setUser(user:any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser() {
    let userData = localStorage.getItem("user");
    if (userData == undefined || userData == null || userData == '') {
      this.logout();
      return null;
    } else {
      return JSON.parse(userData);
    }
  }

  // get User Role
  public getUserRole() {
    let user = this.getUser();
    if(user == null) return null;
    return user.authorities[0].authority;
  }

}
