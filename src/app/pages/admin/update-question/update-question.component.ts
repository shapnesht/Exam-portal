import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _question: QuestionService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) {}

  quiz: any = {
    title: '',
  };
  quizId: any;
  questionId: any;

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quizId'];
    this.questionId = this._route.snapshot.params['questionId'];
    this._quiz.getQuiz(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
        this.data.quiz.quizId = this.quizId;
      },
      (error) => {
        Swal.fire(
          'Error!!',
          'Server Error, Please Try Again Later',
          'error'
        ).then((success) => {
          if (success.isConfirmed) {
            this._router.navigate(['/admin/profile']);
          }
        });
      }
    );
    this._question.getQuestion(this.questionId).subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        Swal.fire(
          'Error!!',
          'Server Error, Please Try Again Later',
          'error'
        ).then((success) => {
          if (success.isConfirmed) {
            this._router.navigate(['/admin/']);
          }
        });
      }
    );
  }
  data: any = {
    content: '',
    answer: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    quiz: {
      quizId: 0,
    },
  };

  onSubmit() {
    if (
      this.data.answer.trim() == '' ||
      this.data.content.trim() == '' ||
      this.data.option1.trim() == '' ||
      this.data.option2.trim() == ''
    ) {
      this._snack.open('Please Enter All the Values', '', {
        duration: 2000,
      });
      return;
    }

    Swal.fire({
      icon: 'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Update?',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.addQuestion(this.data).subscribe(
          (data: any) => {
            Swal.fire(
              'Quiz Updated Successfully!!',
              'The quiz was successfully Updated',
              'success'
            ).then((e) => {
              this._router.navigate([`/admin/view-questions/${this.quizId}/${this.quiz.title}`]);
            });
          },
          (error: any) => {
            Swal.fire(
              'Error!!',
              'Server Error, Please Try Again Later',
              'error'
            );
          }
        );
      }
    });
  }
}
