import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizzes',
  templateUrl: './show-quizzes.component.html',
  styleUrls: ['./show-quizzes.component.css'],
})
export class ShowQuizzesComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) {}
  categoryId: any;
  quizzes: any;
  ngOnInit(): void {
    this._route.params.subscribe((data: any) => {
      this.categoryId = data.categoryId;
      if (this.categoryId == 0) {
        this._quiz.getAllActiveQuizzes().subscribe(
          (data) => {
            this.quizzes = data;
          },
          (error) => {
            Swal.fire(
              'Error!!',
              'Server Error, Please Try Again Later',
              'error'
            );
          }
        );
      } else {
        this._quiz.geActivetQuizByCategory(this.categoryId).subscribe(
          (data) => {
            this.quizzes = data;
          },
          (error) => {
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
