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
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  // columnHeaders: string[] = ['Product', 'Price', 'Quantity', 'Total', 'Actions']
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

  removeQuantity(element: Cart): void {
    this.shoppingCartService.removeQuantity(element);
  }

  addQuantity(element: Cart): void {
    this.shoppingCartService.addQuantity(element);
  }

  totalQuantity(): number {
    return this.shoppingData.map(x => x.quantity).reduce((acc, value) => acc + value, 0)
  }

  totalCost(): number {
    return this.shoppingData.reduce((acc, value) => acc + (value.price * value.quantity), 0)
  }

  removeProduct(element: Cart): void {
    this.shoppingData = this.shoppingCartService.removeProduct(element);
  }
}
