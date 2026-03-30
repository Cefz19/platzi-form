import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CategoriesService } from '../../../../core/services/categories.service';
import { FormGroup } from '@angular/forms';
import { Category } from '../../../../core/models/category.model';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  standalone: false,
})
export class CategoryComponent {

  form!: FormGroup;
  categoryId!: string;
  category!: Category;

  categoryService =  inject(CategoriesService)
  router = inject(Router);
  route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      if (params.id) {
        this.getCategory(params.id);
      }
    });
  }

  createCategory(data: Partial<Category>) {
    this.categoryService.createCategory(data)
    .subscribe(rta => {
      console.log(rta);
      this.router.navigate(['./admin/categories']);
    });
  };

  updateCategory(data: Partial<Category>) {
    this.categoryService.updateCategory(this.category._id, data)
    .subscribe(rta => {
      console.log(rta);
      this.router.navigate(['./admin/categories']);
    });
  };

  private getCategory(id: string) {
    this.categoryService.getCategory(this.categoryId)
    .subscribe(data => {
      this.category = data;
    });
  }


  //  private createCategory() {
  //   const data = this.form.value;
  //   this.categoryService.createCategory(data)
  //   .subscribe(rta => {
  //     console.log(rta);
  //     this.router.navigate(['./admin/categories']);
  //   });
  // };

  // private updateCategory() {
  //   const data = this.form.value;
  //   this.categoryService.updateCategory(this.categoryId, data)
  //   .subscribe(rta => {
  //     console.log(rta);
  //     this.router.navigate(['./admin/categories']);
  //   });
  // };

  // private getCategory(id: StringDecoder) {
  //   this.categoryService.getCategory(this.categoryId)
  //   .subscribe(data => {
  //     console.log(data);
  //     this.form.patchValue(data);
  //     // this.router.navigate(['./admin/categories']);
  //   });
  // }
}
