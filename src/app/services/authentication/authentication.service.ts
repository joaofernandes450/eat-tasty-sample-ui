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

  constructor(private http: HttpClient, private router: Router) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  /**
   * Login
   * @param email - user email, as string 
   * @param password - user password, as string
   */
  userLogin(email: string, password: string): Observable<Result> {
    return new Observable<Result>(observer => {
      this.userInfo = {
        tokenExp: new Date(new Date().getTime() + (300 * 60 * 1000)) //10min for now
      }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      this.authenticationSubject.next(this.userInfo);
      observer.next({ success: true, message: 'Welcome back!' }) //simulate login
    })
  }

  /**
   * Logout
   */
  userLogout(): void {
    if (localStorage.getItem('userInfo')) {
      localStorage.removeItem('userInfo');
      this.userInfo = null;
      this.authenticationSubject.next(this.userInfo);
      this.router.navigate(['']);
    }
  }

  /**
   * Check token validation
   */
  hasTokenExpired(): boolean {
    if (!this.userInfo) return true;
    const date = new Date(this.userInfo.tokenExp);
    if (date && date.valueOf() < new Date().valueOf()) return true;
    return false;
  }
}
