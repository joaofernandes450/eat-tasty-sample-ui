import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

interface Result {
  success: boolean;
  message: string;
  data?: any;
  token?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
      this.http.post<Result>(environment.authenticationURL + '/login', { email: email, password: password }).subscribe(data => {
        if (data.token) {
          const tokenDecoded: any = jwt_decode(data.token);

          this.userInfo = {
            token: data.token,
            tokenExpiration: tokenDecoded.exp,
            id: tokenDecoded.id,
            firstName: tokenDecoded.firstName,
            lastName: tokenDecoded.lastName,
            email: tokenDecoded.email,
            phoneNumber: tokenDecoded.phoneNumber,
            vat: tokenDecoded.vat,
            address: tokenDecoded.address,
            deliveryInformation: tokenDecoded.deliveryInformation
          }

          console.log("TOKEN", this.userInfo);

          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          this.authenticationSubject.next(this.userInfo);
          observer.next(data)
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        observer.next({ success: false, message: err.error.message ? err.error.message : 'An unexpected error occurred, please try again later!' });
      })
    })
  }

  /**
   * User registration
   * @param firstName 
   * @param lastName 
   * @param email 
   * @param phoneNumber 
   * @param address 
   * @param deliveryInformation 
   * @param password 
   * @param vat 
   */
  registerUser(firstName: string, lastName: string, email: string, phoneNumber: string, address: string, deliveryInformation: any, password: string, vat?: string): Observable<Result> {
    return new Observable<Result>(observer => {
      this.http.post<Result>(`${environment.authenticationURL}/register`, { firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, address: address, deliveryInformation: deliveryInformation, password: password, vat: vat }).subscribe(data => {
        observer.next(data);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        observer.next({ success: false, message: err.error.message ? err.error.message : 'An unexpected error occurred, please try again later!' });
      })
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
    const date = new Date(0);
    date.setUTCSeconds(this.userInfo.tokenExpiration)
    if (date && date.valueOf() < new Date().valueOf()) return true;
    return false;
  }
}
