import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  saveUser(user:any) {
    return this.http.post(`${baseurl}/user/`, user);
  }

  constructor(private http:HttpClient) { }
}
