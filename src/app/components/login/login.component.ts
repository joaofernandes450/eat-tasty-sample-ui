import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  hidePassword: boolean = true;
  recoverPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  /**
   * Login Form
   */
  createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required]
    })
  }

  /**
   * Login form event when submitted
   */
  userLogin(): void {
    if (this.loginForm.valid) {
      //service
      this.router.navigate(['/app']);
    }
  }

}
