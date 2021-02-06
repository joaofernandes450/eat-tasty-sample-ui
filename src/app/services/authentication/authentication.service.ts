import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

interface Result {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationURL = "";

  userInfo: any;
  authenticationSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Login
   * @param email - user email, as string 
   * @param password - user password, as string
   */
  userLogin(email: string, password: string): Observable<Result> {
    return new Observable<Result>(observer => {
      this.userInfo = {
        tokenExp: 60 //1min for now
      }
      localStorage.setItem('userInfo', this.userInfo);
      this.authenticationSubject.next(this.userInfo);
      observer.next({ success: true, message: 'Welcome back!' }) //simulate login
    })
  }
}
