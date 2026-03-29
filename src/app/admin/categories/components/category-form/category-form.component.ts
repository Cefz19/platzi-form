import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { CategoriesService } from '../../../../core/services/categories.service';
import { MyValidators } from '../../../../utils/validators';


@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
    standalone: false
})
export class CategoryFormComponent implements OnInit {

  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private router : Router,
    private storage: AngularFireStorage,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)], MyValidators.validateCategory(this.categoryService)],
      image: ['', Validators.required],
    });
  }

  get nameField() {
    return this.form.get('name');
  }
  get imageField() {
    return this.form.get('image');
  }

  save() {
    if(this.form.valid){
      this.createCategory();
      console.log(this.createCategory());
    }else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const data = this.form.value;
    this.categoryService.createCategory(data)
    .subscribe(rta => {
      console.log(rta);
      this.router.navigate(['./admin/categories']);
    });
  }

  uploadFile(event: any){
    const image = event.target.files[0];
    if(image) {
      const reader = new FileReader();
      reader.onload = () => {
        const localUrl = reader.result as string;
        console.log('URL Local: ', localUrl);
        this.imageField?.setValue(localUrl);
      };
      reader.readAsDataURL(image);
    }

  }

  // uploadFile(event: any) {
  //   const image = event.target.files[0];
  //   const name = `categories/${Date.now()}_category.png`;
  //   const ref = this.storage.ref(name);
  //   const task = this.storage.upload(name, image);

  //   task.snapshotChanges()
  //   .pipe(
  //     finalize(() => {
  //       const urlImage = ref.getDownloadURL();
  //       urlImage.subscribe(url => {
  //         console.log(url);
  //         this.imageField?.setValue(url);
  //       })
  //     })
  //   )
  //   .subscribe()
    
  // }

}
