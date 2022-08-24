import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _quiz: QuizService,
    private category: CategoryService,
    private snack: MatSnackBar,
    private _route: Router
  ) {}
  categories: any = [];
  quizId = 0;

  quiz: any = {
    title: '',
    description: '',
    maximumMarks: 0,
    numberOfQuestions: 0,
    category: {
      categoryId: null,
    },
  };

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId'];
    this._quiz.getQuiz(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        Swal.fire(
          'Error!!',
          'Server is having some issues, please try later',
          'error'
        );
      }
    );
    this.category.categories().subscribe(
      (data) => {
        this.categories = data;
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

  onClick() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.snack.open('Title Should not be empty!!', '', {
        duration: 2000,
      });
      return;
    }
    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this.snack.open('Description Should not be empty!!', '', {
        duration: 2000,
      });
      return;
    }
    if (this.quiz.category.categoryId == null) {
      this.snack.open('Category Should be valid!!', '', {
        duration: 2000,
      });
      return;
    }
    if (
      this.quiz.numberOfQuestions == null ||
      this.quiz.numberOfQuestions == 0
    ) {
      this.snack.open('Number Of Questions should be greater than 0!!', '', {
        duration: 2000,
      });
      return;
    }
    if (this.quiz.maximumMarks == null || this.quiz.maximumMarks == 0) {
      this.snack.open('Maximum marks should be greater than 0!!', '', {
        duration: 2000,
      });
      return;
    }

    Swal.fire({
      icon: 'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Update?',
      cancelButtonText:'No',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.saveQuiz(this.quiz).subscribe(
          (data: any) => {
            Swal.fire(
              'Quiz Updated Successfully!!',
              'The quiz was successfully Updated',
              'success'
            ).then((e) => {
              this._route.navigate(['/admin/quizzes']);
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

  discardChanges() {
    Swal.fire({
      icon: 'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Discard the changes?',
      cancelButtonText:'No',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed) {
        this._route.navigate(["/admin/quizzes"]);
      }
    })
  }
}
