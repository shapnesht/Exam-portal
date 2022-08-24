import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any = [];

  constructor(private quiz: QuizService) {}

  ngOnInit(): void {
    this.quiz.getAllQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire(
          'Quizzes Not Found!!',
          'Server is having some issues, please try later',
          'error'
        );
      }
    );
  }

  onClickDelete(id: any) {
    Swal.fire({
      icon:'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Delete?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quiz.deleteQuiz(id).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((q: any) => q.quizId != id);
            Swal.fire('Success', 'Quiz Deleted Successfully!!', 'success');
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
}
