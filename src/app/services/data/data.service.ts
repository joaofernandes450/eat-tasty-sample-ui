import { Injectable } from '@angular/core';

import { COUNTRIES } from '../../utils/country-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCountries() {
    return COUNTRIES;
  }
}
