import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  categories: any;

  constructor(public _categories: CategoryService) {}

  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error!!', 'Server Error, Please Try Again Later', 'error');
      }
    );
  }
}
