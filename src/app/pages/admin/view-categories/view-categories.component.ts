import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories: any = [];

  constructor(private category: CategoryService) {}

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error!!', 'Server error', 'error');
      }
    );
  }

  onClickDelete(id: any) {
    Swal.fire({
      icon: 'question',
      title: 'Confirmation',
      text: 'Are You Sure You want to Delete?',
      confirmButtonText: 'Yes',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.category.deleteCategory(id).subscribe(
          (data: any) => {
            this.categories = this.categories.filter((c: any) => c.categoryId != id);
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
}
