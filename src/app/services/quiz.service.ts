import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http:HttpClient) { }

  deleteQuiz(id: any) {
    console.log(`${baseurl}/quiz/${id}`);
    return this.http.delete(`${baseurl}/quiz/${id}`);
  }

  getAllQuizzes() {
    return this.http.get(`${baseurl}/quiz/`);
  }

  saveQuiz(quiz:any) {
    return this.http.post(`${baseurl}/quiz/`, quiz);
  }

  getQuiz(quizId:any) {
    return this.http.get(`${baseurl}/quiz/${quizId}`);
  }
  
  getQuizByCategory(categoryId:any) {
    return this.http.get(`${baseurl}/quiz/category/${categoryId}`);
  }
}
