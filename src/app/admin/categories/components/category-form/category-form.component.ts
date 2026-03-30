import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: false,
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  image$!: Observable<string>;
  @Input() category: Category | undefined;
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private categoryService: CategoriesService
  ) {
    this.buildForm();
  }
  ngOnInit(): void {
  }

  
  private buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(4)],
        [MyValidators.validateCategory(this.categoryService)],
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
      if(this.category) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }  
    } else {
      this.form.markAllAsTouched();
    }
  }

 

  // private createCategory() {
  //   const data = this.form.value;
  //   console.log('Datos listos para enviar al servidor:', data);

  //   setTimeout(() => {
  //     console.log('Simulando éxito del servidor...');
  //     this.router.navigate(['/admin/categories']); // Asegúrate que la ruta sea exacta
  //   }, 500);

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
  // }

  
  // uploadFile(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     console.log('Simulador loader');
  //     const fakeUrl = 'https://placeimg.com';

  //     this.form.get('image')?.setValue(fakeUrl);
  //     console.log('Imagen simulada lista:', fakeUrl);
  //     this.form.get('image')?.markAsDirty();
  //   }
  // }

  uploadFile(event: any) {
    const image = event.target.files[0];
    const name = `categories/${Date.now()}_${image.name}`;
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const urlImage = ref.getDownloadURL();
        urlImage.subscribe(url => {
          console.log(url);
          this.imageField?.setValue(url);
        })
      })
    )
    .subscribe()

  }
}
