import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.css'],
})
export class UpdateCategoriesComponent implements OnInit {
  constructor(
    private _category: CategoryService,
    private _activatedRoute: ActivatedRoute,
    private snack: MatSnackBar,
    private _route: Router
  ) {}

  categoryId = 0;
  ngOnInit(): void {
    this.categoryId = this._activatedRoute.snapshot.params['categoryId'];
    this._category.getCategory(this.categoryId).subscribe(
      (category: any) => {
        this.data = category;
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

  data: any;

  formSubmit() {
    if (this.data.title == null || this.data.title.trim() == '') {
      this.snack.open('Category Name Should not be empty!!', '', {
        duration: 2000,
      });
      return;
    }
    if (this.data.description == null || this.data.description.trim() == '') {
      this.snack.open('Description Should not be empty!!', '', {
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
        this._category.updateCategory(this.data).subscribe(
          (data: any) => {
            Swal.fire(
              'Category Updated Successfully!!',
              'The Category was successfully Updated',
              'success'
            ).then((e) => {
              this._route.navigate(['/admin/categories']);
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

  discard() {
    Swal.fire({
      icon: 'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Discard the changes?',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._route.navigate(['/admin/categories']);
      }
    });
  }
}
