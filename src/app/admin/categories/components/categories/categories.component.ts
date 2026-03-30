import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services/categories.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: false
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];

  constructor(
    private categoriesServices: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  private getCategory(){
    this.categoriesServices.getAllCategories()
    .subscribe({
      next: (categories) => {
        this.categories = categories;
        if(this.categories.length === 0) {
          this.setMockData();
        }
      }, 
      error: (error) => {
        console.log('Error de conexion, cargando mock...', error);
        this.setMockData();
      }
    })
  }

  private setMockData() {
    this.categories = [{
      _id: '1',
      name: 'Prueba Mock',
          image: 'https://picsum.photos',
    }]
  }

}
