import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _question: QuestionService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) {}

  quiz: any = {
    title: 'Title',
  };
  quizId: any;

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quizId'];
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
    this._question.addQuestion(this.data).subscribe(
      (success: any) => {
        Swal.fire(
          'Success!!',
          'Category was successfully added with id : ' + success.questionId,
          'success'
        ).then((success) => {
          if (success.isConfirmed) {
            this._router.navigate([
              `/admin/view-questions/${this.quizId}/${this.quiz.title}`,
            ]);
          }
        });
      },
      (error) => {
        Swal.fire('Error!!', 'Server Error, Please Try Again Later', 'error');
      }
    );
  }
}
