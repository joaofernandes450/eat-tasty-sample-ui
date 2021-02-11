import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

interface Result {
  success: boolean,
  message: string,
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

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
  getRestaurants(): Observable<Result> {
    return this.http.get<Result>(`${environment.restaurantURL}/`, this.getHeaders());
  }
}
