import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingData = this.shoppingCartService.shoppingData;
    this.shoppingCartService.shoppingDataChange.subscribe((value) => {
      this.shoppingData = value;
      this.shoppingData = [...this.shoppingData]; //mat-table requires to update
    })
  }

  /**
   * Returns the cart total price
   */
  getTotal(): number {
    return this.shoppingData.reduce((acc, value) => acc + (value.price * value.quantity), 0)
  }

}
