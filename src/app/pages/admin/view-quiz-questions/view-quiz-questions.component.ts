import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _question: QuestionService
  ) {}

  quizId: any;
  quizTitle: any;
  questions: any;

  deleteQuestion(questionId: any) {
    Swal.fire({
      icon: 'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Delete?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(questionId).subscribe(
          (data: any) => {
            this.questions = this.questions.filter(
              (q: any) => q.questionId != questionId
            );
            Swal.fire('Success', 'Category Deleted Successfully!!', 'success');
          },
          (error) => {
            Swal.fire(
              'Error!!',
              'Server is having some issues, please try later',
              'error'
            );
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.quizId = this._activatedRoute.snapshot.params['quizId'];
    this.quizTitle = this._activatedRoute.snapshot.params['quizTitle'];
    console.log(this.quizId);
    console.log(this.quizTitle);
    this._question.getAllQuestions(this.quizId).subscribe(
      (data) => {
        this.questions = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
