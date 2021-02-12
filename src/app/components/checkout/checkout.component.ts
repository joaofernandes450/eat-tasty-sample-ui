import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { NotificationSnackbarService } from 'src/app/services/notification-snackbar/notification-snackbar.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

interface Cart {
  image?: string,
  name: string,
  price: number,
  quantity: number
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  proceed: boolean = false;

  columnHeaders: string[] = ['Product', 'Quantity', 'Actions']
  dataSource: MatTableDataSource<any>;

  shoppingData: Cart[] = [];

  shippingFormGroup: FormGroup;

  minDate: Date = new Date();
  maxDate: Date = new Date();

  constructor(private shoppingCartService: ShoppingCartService, private _fb: FormBuilder, private authenticationService: AuthenticationService, private dialog: MatDialog, private loadingService: LoadingService,
    private notificationService: NotificationSnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.shoppingData = this.shoppingCartService.shoppingData;
    this.shoppingCartService.shoppingDataChange.subscribe((value) => {
      this.shoppingData = value;
      this.shoppingData = [...this.shoppingData]; //mat-table requires to update
    })
    this.createShippingFormGroup();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 14);
  }

  /**
   * Removes one quantity
   * @param element 
   */
  removeQuantity(element: Cart): void {
    this.shoppingCartService.removeQuantity(element);
  }

  /**
   * Adds one quantity
   * @param element 
   */
  addQuantity(element: Cart): void {
    this.shoppingCartService.addQuantity(element);
  }

  /**
   * Removes a product from the cart
   * @param element 
   */
  removeProduct(element: Cart): void {
    this.shoppingCartService.removeProduct(element);
  }

  /**
   * Returns the cart total price
   */
  getTotal(): number {
    return this.shoppingData.reduce((acc, value) => acc + (value.price * value.quantity), 0)
  }

  /**
   * Creates the necessary Form Group
   */
  createShippingFormGroup(): void {
    this.shippingFormGroup = this._fb.group({
      firstName: this.authenticationService.userInfo.firstName,
      lastName: this.authenticationService.userInfo.lastName,
      address: this.authenticationService.userInfo.address.street,
      postalCode: this.authenticationService.userInfo.address.postalCode,
      city: this.authenticationService.userInfo.address.city,
      email: this.authenticationService.userInfo.email,
      vat: this.authenticationService.userInfo.address.vat,
      deliveryAddress: this.authenticationService.userInfo.address.street + " " + this.authenticationService.userInfo.address.postalCode + " " + this.authenticationService.userInfo.address.city,
      date: ['', Validators.required],
      timeframe: ['lunch', Validators.required],
      shippingType: ['free', Validators.required]
    })
  }

  /**
   * Places a new Order.
   * 
   * Triggered when the User finishes the checkout process.
   */
  placeOrder(): void {
    if (this.shippingFormGroup.valid) {
      const message = 'Place this order and simulate payment details?';
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: message
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadingService.showLoadingSpinner();
          setTimeout(() => {
            // order service here
            this.shoppingCartService.clearCart();
            this.notificationService.showSuccess('Order now placed with number #23499');
            this.loadingService.stopLoadingSpinner();
            this.router.navigate(['/app/home']);
          }, 2000)
        }
      })
    }
  }

}
