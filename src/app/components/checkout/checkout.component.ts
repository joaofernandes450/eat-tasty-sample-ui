import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

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

  constructor(private shoppingCartService: ShoppingCartService, private _fb: FormBuilder, private authenticationService: AuthenticationService) { }

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
    this.shoppingData = this.shoppingCartService.removeProduct(element);
  }

  /**
   * Returns the cart total price
   */
  getTotal(): number {
    return this.shoppingData.reduce((acc, value) => acc + (value.price * value.quantity), 0)
  }

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

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
