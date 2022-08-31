import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  deleteQuestion(questionId: any) {
    return this._http.delete(`${baseurl}/question/${questionId}`);
  }
  addQuestion(data: any) {
    return this._http.post(`${baseurl}/question/`, data);
  }

  constructor(private _http: HttpClient) { }

  getQuestion(questionId:any) {
    return this._http.get(`${baseurl}/question/${questionId}`);
  }

  getQuestions(quizId:any) {
    return this._http.get(`${baseurl}/question/quiz/${quizId}`);
  }
  getAllQuestions(quizId:any) {
    return this._http.get(`${baseurl}/question/quiz/all/${quizId}`);
  }

  evaluate(question:any) {
    return this._http.post(`${baseurl}/question/evaluate-quiz`, question);
  }
}
