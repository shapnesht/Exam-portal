import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  data = {
    "title":'',
    "description":''
  }

  constructor(private category:CategoryService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if(this.data.title==null || this.data.title.trim()=='') {
      this.snack.open("Category Name Should not be empty!!",'', {
        duration:2000
      })
      return;
    }
    if(this.data.description==null || this.data.description.trim()=='') {
      this.snack.open("Description Should not be empty!!",'', {
        duration:2000
      })
      return;
    }
    this.category.addCategory(this.data).subscribe(
      (success:any)=> {
        Swal.fire("Success!!", "Category was successfully added with id : " + success.categoryId, 'success');
      },
      error=>{
        Swal.fire("Error!!", "Server Error, Please Try Again Later", 'error');
      }
    )
  }
}
