import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface Cart {
  image?: string,
  name: string,
  price: number,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public shoppingData: Cart[] = [];

  shoppingDataChange: Subject<Cart[]> = new Subject<Cart[]>();

  constructor() {

    this.shoppingDataChange.subscribe((value) => {
      this.shoppingData = value;
      localStorage.setItem('shopping-cart-12345', JSON.stringify(this.shoppingData));
    })

    // For now 12345 relates to an User ID that will be implemented when backend is operation
    const localSt = JSON.parse(localStorage.getItem('shopping-cart-12345'));
    if (!localSt || localSt.length == 0) {
      this.shoppingData.push({
        image: 'https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1577911805/web_809_fswyha.jpg', name: 'Tomato Soup',
        price: 5, quantity: 2
      });
      this.shoppingData.push({
        image: 'https://static.eattasty.com/cloudinary/eattasty/image/upload/q_auto/v1610722723/2076-lulas-molho-verde_woamn6.jpg', name: 'Grilled Squid with "Molho Verde"',
        price: 5, quantity: 2
      })
      localStorage.setItem('shopping-cart-12345', JSON.stringify(this.shoppingData));
    } else {
      this.shoppingData = JSON.parse(localStorage.getItem('shopping-cart-12345'))
    }
  }

  removeQuantity(element: Cart): void {
    element.quantity--;
    localStorage.setItem('shopping-cart-12345', JSON.stringify(this.shoppingData));
  }

  addQuantity(element: Cart): void {
    element.quantity++;
    localStorage.setItem('shopping-cart-12345', JSON.stringify(this.shoppingData));
  }

  removeProduct(element: Cart): Cart[] {
    this.shoppingData = this.shoppingData.filter(x => x.name !== element.name)
    this.shoppingDataChange.next(this.shoppingData);
    localStorage.setItem('shopping-cart-12345', JSON.stringify(this.shoppingData));
    return this.shoppingData;
  }

  addProduct(element: Cart): void {
    const data = this.shoppingData.find(x => x.name === element.name); //Change after to id's when backend is operational
    if (data) {
      data.quantity++;
      this.shoppingDataChange.next(this.shoppingData);
    } else {
      this.shoppingData.push(element);
      this.shoppingDataChange.next(this.shoppingData);
    }
  }
}
