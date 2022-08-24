import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  quiz = {
    title: '',
    description: '',
    maximumMarks: 0,
    numberOfQuestions: 0,
    active: true,
    category: {
      categoryId: null,
    },
  };

  submitQuiz() {
    if(this.quiz.title.trim()=='' || this.quiz.title == null) {
      this.snack.open("Title Should not be empty!!", '', {
        duration:2000
      })
      return;
    }
    if(this.quiz.description.trim()=='' || this.quiz.description == null) {
      this.snack.open("Description Should not be empty!!", '', {
        duration:2000
      })
      return;
    }
    if(this.quiz.category.categoryId ==null) {
      this.snack.open("Category Should be valid!!", '', {
        duration:2000
      })
      return;
    }
    if(this.quiz.numberOfQuestions==null || this.quiz.numberOfQuestions == 0) {
      this.snack.open("Number Of Questions should be greater than 0!!", '', {
        duration:2000
      })
      return;
    }
    if(this.quiz.maximumMarks==null || this.quiz.maximumMarks == 0) {
      this.snack.open("Maximum marks should be greater than 0!!", '', {
        duration:2000
      })
      return;
    }
    this.quizService.saveQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire(
          'Quiz Saved Successfully!!',
          'The quiz was successfully saved with id = ' + data.quizId,
          'success'
        );
        this.quiz = {
          title: '',
          description: '',
          maximumMarks: 0,
          numberOfQuestions: 0,
          active: true,
          category: {
            categoryId: null,
          },
        };
      },
      (errror) => {
        Swal.fire('Error!!', 'Server Error, Please Try Again Later', 'error');
      }
    );
  }

  categories: any = [];

  constructor(
    private category: CategoryService,
    private quizService: QuizService,
    private snack:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire(
          'Oops Something Went Wrong',
          'Unable to Contact Server',
          'error'
        );
      }
    );
  }
}
