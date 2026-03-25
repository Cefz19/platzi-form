import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
  standalone: false,
})
export class BasicFormComponent implements OnInit {
  form = new FormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    color: new UntypedFormControl('#00000'),
    date: new UntypedFormControl(''),
    age: new UntypedFormControl(12),
    mount: new UntypedFormControl(''),
    range: new UntypedFormControl(''),
    weeken: new UntypedFormControl(''),
    time: new UntypedFormControl(''),
    search: new UntypedFormControl('Pais'),
    category: new UntypedFormControl(''),
    tag: new UntypedFormControl(''),
    agree: new UntypedFormControl(''),
    gender: new UntypedFormControl(''),
    zone: new UntypedFormControl('Paris'),
  });

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

  categoryField = new UntypedFormControl('category-2');
  tagField = new UntypedFormControl('');

  agreeField = new UntypedFormControl(false);
  genderField = new UntypedFormControl('');
  zoneField = new UntypedFormControl('');

  constructor() {}

  ngOnInit(): void {
    this.namesField.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  getNameValue() {
    console.log(this.namesField.value);
  }

  save() {
    console.log(this.form.value);
  }

  get namesField() {
    return this.form.get('name');
  }

  get emailsField() {
    return this.form.get('email');
  }

  get phonesField() {
    return this.form.get('phone');
  }

  get colorsField() {
    return this.form.get('color');
  }

  get datesField() {
    return this.form.get('date');
  }

  get agesField() {
    return this.form.get('age');
  }

  get categorysField() {
    return this.form.get('category');
  }

  get mountsField() {
    return this.form.get('mount');
  }
  get rangesField() {
    return this.form.get('range');
  }

  get weekendsField() {
    return this.form.get('weekend');
  }

  get timesField() {
    return this.form.get('time');
  }

  get searchsField() {
    return this.form.get('serch');
  }

  get isNameFieldValid() {
    return this.namesField.touched && this.namesField.valid;
  }

  get isNameFieldInvalid() {
    return this.namesField.touched && this.namesField.invalid;
  }
}
