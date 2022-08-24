import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  updateCategory(data: any) {
    return this.http.put(`${baseurl}/category/`, data);
  }
  
  deleteCategory(id: any) {
    return this.http.delete(`${baseurl}/category/${id}`);
  }

  constructor(private http:HttpClient) { }

  // get category from server
  public categories() {
    return this.http.get(`${baseurl}/category/`);
  }

  // save category to server
  public addCategory(category:any) {
    return this.http.post(`${baseurl}/category/`, category);
  }

  public getCategory(categoryId: any) {
    return this.http.get(`${baseurl}/category/${categoryId}`);
  }
}
