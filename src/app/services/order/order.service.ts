import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

interface Result {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  /**
   * Token Header
   */
  getHeaders() {
    let headers = new HttpHeaders({
      'x-access-token': this.authenticationService.userInfo.token
    });

    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  /**
   * Requests all Orders
   * @param userID 
   */
  getUserOders(userID: string): Observable<Result> {
    return this.http.get<Result>(`${environment.orderURL}/user/${userID}`, this.getHeaders());
  }

  /**
   * Requets Orders based on filters
   * @param userID - userID,
   * @param state - state (i.e., "closed"/"open")
   * @param startDate - starting date
   * @param endDate - ending date
   */
  getFilteredUserOrder(userID: string, state?: string, startDate?: Date, endDate?: Date): Observable<Result> {
    return this.http.get<Result>(`${environment.orderURL}/user/${userID}/filter/${startDate}/${endDate}/state/${state.toLocaleLowerCase()}`, this.getHeaders());
  }

  /**
   * Creates a new Order
   * @param userID - userID
   * @param deliveryDate - date of delivery
   * @param deliveryTime - time of delivery
   * @param deliveryAddress - address of delivery
   * @param products - products bought
   * @param totalPrice - total price of products bought
   */
  createOrder(userID: string, deliveryDate: Date, deliveryTime: string, deliveryAddress: any, products: any[], totalPrice: number): Observable<Result> {
    return new Observable<Result>(observer => {
      this.http.post<Result>(`${environment.orderURL}/create`, { userID: userID, deliveryDate: deliveryDate, deliveryTime: deliveryTime, deliveryAddress: deliveryAddress, products: products, totalPrice: totalPrice }, this.getHeaders()).subscribe(data => {
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
}
