import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css'],
})
export class StartQuizComponent implements OnInit {
  constructor(
    private locationStrategy: LocationStrategy,
    private _route: ActivatedRoute,
    private _router: Router,
    private _question: QuestionService
  ) {}

  quizId: any;
  timer: any;
  totalTime: any;
  correctAnswers = 0;
  marks = 0;
  marksPerQuestion = 0;
  attemptedQuestion = 0;
  isSubmitted = false;
  timeForOneQuestion = 60;

  print() {
    window.print();
  }

  questions: any = [
    {
      quiz: {
        title: '',
      },
    },
  ];

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this._route.snapshot.params['quizId'];
    this._question.getQuestions(this.quizId).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * this.timeForOneQuestion;
        this.totalTime = this.questions.length * this.timeForOneQuestion;
        // this.questions.forEach((q: any) => {
        //   q['givenAnswer'] = '';
        // });
        // this.marksPerQuestion =
        //   this.questions[0].quiz.maximumMarks / this.questions.length;
        this.updatetimer();
      },
      (error) => {
        Swal.fire(
          'Error!!',
          'Server Error, Please Try Again Later',
          'error'
        ).then((e) => {
          if (e.isConfirmed) {
            this._router.navigate(['/user-dashboard/0']);
          }
        });
      }
    );
  }

  onSubmit() {
    Swal.fire({
      icon: 'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Submit?',
      cancelButtonText: 'No',
      confirmButtonText: 'Submit',
      showCancelButton: true,
    }).then((e) => {
      if (e.isConfirmed) {
        // calculate
        this.evaluateQuiz();
      }
    });
  }
  minutes: any;
  seconds: any;
  onAutoSubmit() {
    this.evaluateQuiz();
  }

  updatetimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.onAutoSubmit();
        clearInterval(t);
      } else {
        this.timer--;
        this.minutes = Math.floor(this.timer / 60);
        this.seconds = this.timer % 60;
      }
    }, 1000);
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, 'Cant go back', location.href);
    });
  }

  evaluateQuiz() {
    this.isSubmitted = true;
    this._question.evaluate(this.questions).subscribe(
      (data: any) => {
        console.log(data);

        this.correctAnswers = data.correctAnswers;
        this.attemptedQuestion = data.attempted;
        this.marks = (data.marks).toFixed(2);
      },
      (error) => {
        Swal.fire('Error!!', 'Server Error, Please Try Again Later', 'error');
      }
    );
    // this.questions.forEach((q: any) => {
    //   if (q.givenAnswer == q.answer) this.correctAnswers++;
    //   if (q.givenAnswer.trim() != '') this.attemptedQuestion++;
    // });
    // this.marks = this.correctAnswers * this.marksPerQuestion;
  }
}
