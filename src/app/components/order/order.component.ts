import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OrderService } from 'src/app/services/order/order.service';

import * as moment from 'moment';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { NotificationSnackbarService } from 'src/app/services/notification-snackbar/notification-snackbar.service';
import { ThrowStmt } from '@angular/compiler';

interface Order {
  userID: string
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderFormGroup: FormGroup;
  orderStateArray: string[] = ['Open', 'Delivering', 'Closed'];

  columnHeaders: string[] = ['Address', 'Date', 'Time', 'Price', 'State']
  dataSource: MatTableDataSource<any>;
  orderData: Order[] = [];

  constructor(private _fb: FormBuilder, private orderService: OrderService, private authenticationService: AuthenticationService, private loadingService: LoadingService, private notificationService: NotificationSnackbarService) { }

  ngOnInit(): void {
    this.createOrderFormGroup();
    this.queryData();
  }

  /**
   * Creates Order form group
   */
  createOrderFormGroup(): void {
    this.orderFormGroup = this._fb.group({
      state: '',
      startDate: '',
      endDate: ''
    })
  }

  /**
   * Queries the first set of data from the database
   */
  queryData(): void {
    this.orderService.getUserOders(this.authenticationService.userInfo.id).subscribe(response => {
      this.orderData = response.data;
    })
  }

  /**
   * Formats the address to a 'street, city - postal code' format
   * @param address 
   */
  formatAddress(address: any) {
    return address.street + ', ' + address.city + ' - ' + address.postalCode;
  }

  /**
   * Trigger Order filter on database
   */
  searchOrders(): void {
    const state = this.orderFormGroup.get('state').value;
    let startDate = this.orderFormGroup.get('startDate').value;
    if (!startDate) startDate = moment().startOf('year');
    let endDate = this.orderFormGroup.get('endDate').value;
    if (!endDate) endDate = moment().endOf('year');
    this.loadingService.showLoadingSpinner();
    if (state || startDate || endDate) { // At least one filter is used
      this.orderService.getFilteredUserOrder(this.authenticationService.userInfo.id, state ? state : '', startDate, endDate).subscribe(response => {
        setTimeout(() => {
          if (response && response.success) {
            this.orderData = response.data;
            this.notificationService.showSuccess(response.message);
            this.loadingService.stopLoadingSpinner();
          } else {
            this.notificationService.showError(response.message);
            this.loadingService.stopLoadingSpinner();
            this.orderData = [];
          }
        }, 2000)
      })
    } else {
      this.queryData();
    }
  }
}
