import { Component, inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
  standalone: false,
})
export class BasicFormComponent implements OnInit {
  form!: FormGroup;

  // form = new FormGroup({
  //   name: new UntypedFormControl('', [
  //     Validators.required,
  //     Validators.maxLength(10),
  //   ]),
  //   email: new UntypedFormControl(''),
  //   phone: new UntypedFormControl(''),
  //   color: new UntypedFormControl('#00000'),
  //   date: new UntypedFormControl(''),
  //   age: new UntypedFormControl(12),
  //   mount: new UntypedFormControl(''),
  //   range: new UntypedFormControl(''),
  //   weekend: new UntypedFormControl(''),
  //   time: new UntypedFormControl(''),
  //   search: new UntypedFormControl('Pais'),
  //   category: new UntypedFormControl(''),
  //   tag: new UntypedFormControl(''),
  //   agree: new UntypedFormControl(''),
  //   gender: new UntypedFormControl(''),
  //   zone: new UntypedFormControl('Paris'),
  // });

  // nameField = new UntypedFormControl('', [
  //   Validators.required,
  //   Validators.maxLength(10),
  // ]);
  // emailField = new UntypedFormControl('');
  // phoneField = new UntypedFormControl('');
  // colorField = new UntypedFormControl('#00000');
  // dateField = new UntypedFormControl('');
  // ageField = new UntypedFormControl(12);
  // mountField = new UntypedFormControl('');
  // rangeField = new UntypedFormControl('');
  // weekendField = new UntypedFormControl('');
  // timeField = new UntypedFormControl('');
  // searchField = new UntypedFormControl('Pais');

  // categoryField = new UntypedFormControl('category-2');
  // tagField = new UntypedFormControl('');

  // agreeField = new UntypedFormControl(false);
  // genderField = new UntypedFormControl('');
  // zoneField = new UntypedFormControl('');

  // formBuilder = inject(FormBuilder);
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.builderForm();
  }

  ngOnInit(): void {
    // this.nameField!.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    // this.form.valueChanges
    // .subscribe((value) => {
    //   console.log(value);
    // })
  }

  getNameValue() {
    console.log(this.nameField!.value);
  }

  save(event: any) {
    if(this.form.valid){
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
    
  }

  private builderForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
        last: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      color: ['#00000'],
      date: [''],
      age: [12, [Validators.required, Validators.min(18), Validators.max(100)]],
      mount: [''],
      range: [''],
      weekend: [''],
      time: [''],
      search: [''],
      category: [''],
      tag: [''],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
      zone: ['Paris'],
    });
  }

  get nameField() {
    return this.form.get('fullName.name');
  }
  get lastField() {
    return this.form.get('fullName.last');
  }

  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get ageField() {
    return this.form.get('age');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get mountField() {
    return this.form.get('mount');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get rangeField() {
    return this.form.get('range');
  }

  get weekendField() {
    return this.form.get('weekend');
  }

  get timeField() {
    return this.form.get('time');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get searchField() {
    return this.form.get('search');
  }

  get zoneField() {
    return this.form.get('zone');
  }

  get isNameFieldValid() {
    return this.nameField!.touched && this.nameField!.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField!.touched && this.nameField!.invalid;
  }
}
