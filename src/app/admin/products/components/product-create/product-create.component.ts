import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';

import { finalize } from 'rxjs/operators';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from '../../../../core/services/categories.service';

import { Observable } from 'rxjs';
import { Category } from '../../../../core/models/category.model';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss'],
    standalone: false
})
export class ProductCreateComponent implements OnInit {
  form: UntypedFormGroup;
  
  image$: Observable<any>;
  categories: Category[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      console.log(product)
      this.productsService.createProduct(product).subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const name = `images/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe({
            next: (url: string) => {
              console.log('URL:', url);
              this.form.get('image')?.setValue(url);
              this.image$ = of(url);
            },
            error: (err) => console.error('Error al obtener URL:', err),
          });
        }),
      )
      .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }
  get nameField() {
    return this.form.get('name');
  }
  get imageField() {
    return this.form.get('image');
  }

  private getCategories() {
    this.categoriesService.getAllCategories()
    .subscribe((data) => {
      this.categories = data;
    });
  }
}
