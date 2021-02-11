import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

interface Result {
  success: boolean,
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) { }

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
   * Requests all Products
   */
  getProducts(): Observable<Result> {
    return this.http.get<Result>(`${environment.productURL}/`, this.getHeaders());
  }

  /**
   * Requests Products based on a type
   * @param type - Product type (i.e., "soup"/"desert")
   */
  getProductsByType(type: string): Observable<Result> {
    return this.http.get<Result>(`${environment.productURL}/filter/${type}`, this.getHeaders());
  }
}
