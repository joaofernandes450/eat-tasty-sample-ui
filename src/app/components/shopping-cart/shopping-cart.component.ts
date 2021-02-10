import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor() { }

  ngOnInit(): void {
    this.shoppingData.push({
      image: 'https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1577911805/web_809_fswyha.jpg', name: 'Tomato Soup',
      price: 5, quantity: 2
    });
    this.shoppingData.push({
      image: 'https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1610722723/2076-lulas-molho-verde_woamn6.jpg', name: 'Grilled Squid with "Molho Verde"',
      price: 5, quantity: 2
    })
    this.dataSource = new MatTableDataSource(this.shoppingData);
    console.log(this.dataSource.data)
  }

  removeQuantity(element: Cart): void {
    element.quantity--;
  }

  addQuantity(element: Cart): void {
    element.quantity++;
  }

  totalQuantity(): number {
    return this.shoppingData.map(x => x.quantity).reduce((acc, value) => acc + value, 0)
  }

  totalCost(): number {
    return this.shoppingData.reduce((acc, value) => acc + (value.price * value.quantity), 0)
  }

  removeProduct(element: Cart): void {
    this.shoppingData = this.shoppingData.filter(x => x !== element)
  }
}
