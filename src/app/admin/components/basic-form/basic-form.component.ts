import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';


@Component({
    selector: 'app-basic-form',
    templateUrl: './basic-form.component.html',
    styleUrls: ['./basic-form.component.scss'],
    standalone: false
})
export class BasicFormComponent implements OnInit {

  nameField = new  UntypedFormControl('');
  emailField = new  UntypedFormControl('');
  phoneField = new  UntypedFormControl('');
  colorField = new  UntypedFormControl('#00000');
  dateField = new  UntypedFormControl('');
  ageField = new  UntypedFormControl(12);

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
