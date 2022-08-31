import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router,
  ) {}

  quizId: any;
  quiz: any = {
    title: 'Quiz',
  };

  startTest() {
    Swal.fire({
      icon: 'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Start Test?',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Start',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.quizId]);
      }
    });
  }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quizId'];

    this._quiz.getQuiz(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        Swal.fire('Error!!', 'Server Error, Please Try Again Later', 'error');
      }
    );
  }
}
