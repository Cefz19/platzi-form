import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {
  // UntypedFormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { CategoriesService } from '../../../../core/services/categories.service';
import { MyValidators } from '../../../../utils/validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: false,
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  image$: Observable<string>;
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params.id;
      if (this.categoryId) {
        this.getCategory();
      }
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(4)],
        // [MyValidators.validateCategory(this.categoryService)]],
      ],
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
    if (this.form.valid) {
      this.createCategory();
    }
    // if(this.form.valid){
    //   this.createCategory();
    //   console.log(this.createCategory());
    // }else {
    //   this.form.markAllAsTouched();
    // }
  }

  // private createCategory() {
  //   const data = this.form.value;
  //   this.categoryService.createCategory(data)
  //   .subscribe(rta => {
  //     console.log(rta);
  //     this.router.navigate(['./admin/categories']);
  //   });
  // };

  private createCategory() {
    const data = this.form.value;
    console.log('Datos listos para enviar al servidor:', data);

    setTimeout(() => {
      console.log('Simulando éxito del servidor...');
      this.router.navigate(['/admin/categories']); // Asegúrate que la ruta sea exacta
    }, 500);

    // this.categoryService.createCategory(data).subscribe({
    //   next: (rta) => {
    //     console.log('Respuesta servidor:', rta);
    //     this.router.navigate(['./admin/categories']);
    //   },
    //   error: (err) => {
    //     console.error('Error en API (posiblemente por la misma cuota):', err);
    // Forzamos el éxito visual para probar el flujo de navegación
    // this.router.navigate(['./admin/categories']);
    //   },
    // });
  }

  private getCategory() {
    this.categoryService.getCategory(this.categoryId)
    .subscribe(data => {
      console.log(data);
      this.form.patchValue(data)
      // this.router.navigate(['./admin/categories']);
    });
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Simulador loader');
      const fakeUrl = 'https://placeimg.com';

      this.form.get('image')?.setValue(fakeUrl);
      console.log('Imagen simulada lista:', fakeUrl);
      this.form.get('image')?.markAsDirty();
    }
  }

  // uploadFile(event: any) {
  //   const image = event.target.files[0];
  //   const name = `categories/${Date.now()}_${image.name}`;
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
