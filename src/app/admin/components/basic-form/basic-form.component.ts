import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';



@Component({
    selector: 'app-basic-form',
    templateUrl: './basic-form.component.html',
    styleUrls: ['./basic-form.component.scss'],
    standalone: false
})
export class BasicFormComponent implements OnInit {

  nameField = new  UntypedFormControl('',  [Validators.required, Validators.maxLength(10)]);
  emailField = new  UntypedFormControl('');
  phoneField = new  UntypedFormControl('');
  colorField = new  UntypedFormControl('#00000');
  dateField = new  UntypedFormControl('');
  ageField = new  UntypedFormControl(12);
  mountField = new  UntypedFormControl('');
  rangeField = new  UntypedFormControl('');
  weekendField = new  UntypedFormControl('');
  timeField = new  UntypedFormControl('');
  searchField = new  UntypedFormControl('Pais');

  categoryField = new  UntypedFormControl('category-2');
  tagField = new  UntypedFormControl('');

  agreeField = new  UntypedFormControl(false);
  genderField = new  UntypedFormControl('');
  zoneField = new  UntypedFormControl('');

  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(value => {
      console.log(value);
    })
  }

  getNameValue(){
    console.log(this.nameField.value);
  }

}
