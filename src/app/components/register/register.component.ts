import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  static phoneNumber(): ValidatorFn {
    return Validators.pattern("^9{1,2,3,6}[0-9]{8}$")
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  images = [
    {
      path: '/assets/1.jpg'
    },
    {
      path: '/assets/2.jpg'
    },
    {
      path: '/assets/3.jpg'
    }
  ];

  dataLoaded: boolean = false;

  registerFirstFormGroup: FormGroup;
  registerSecondFormGroup: FormGroup;
  registerThirdFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  /**
   * Creates the Register Form
   */
  createRegisterForm(): void {
    this.registerFirstFormGroup = this.fb.group({
      verifyAddress: ['', Validators.required],
    })
    this.registerSecondFormGroup = this.fb.group({
      delivery: ['',],
      deliveryType: ['residential'],
      floor: [''],
      otherInfo: [''],
      driverInfo: ['']
    })
    this.registerThirdFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phoneNumber: ['', [Validators.required, CustomValidators.phoneNumber()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      vat: [''],
      country: ['Portugal', Validators.required]
    })
    this.dataLoaded = true;
  }

}
