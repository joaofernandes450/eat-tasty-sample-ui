import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  hidePassword: boolean = true;
  recoverPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
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
      this.authenticationService.userLogin(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(res => {
        if (res && res.success) {
          console.log("entrei");
          this.router.navigate(['/app'])
        }
      })
    }
  }

}
