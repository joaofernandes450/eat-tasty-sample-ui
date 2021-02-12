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
    this.shoppingData = JSON.parse(localStorage.getItem('shopping-cart-12345'))
  }

  /**
   * Removes one quantity from an item
   * @param element 
   */
  removeQuantity(element: Cart): void {
    element.quantity--;
    localStorage.setItem('shopping-cart-12345', JSON.stringify(this.shoppingData));
  }

  /**
   * Adds a quantity to an item
   * @param element 
   */
  addQuantity(element: Cart): void {
    element.quantity++;
    localStorage.setItem('shopping-cart-12345', JSON.stringify(this.shoppingData));
  }

  /**
   * Removes a product from the User cart
   * @param element 
   */
  removeProduct(element: Cart): Cart[] {
    this.shoppingData = this.shoppingData.filter(x => x.name !== element.name)
    this.shoppingDataChange.next(this.shoppingData);
    localStorage.setItem('shopping-cart-12345', JSON.stringify(this.shoppingData));
    return this.shoppingData;
  }

  /**
   * Adds a product to the User cart
   * @param element 
   */
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

  /**
   * Clears the User current cart
   */
  clearCart(): void {
    this.shoppingData.length = 0;
    this.shoppingDataChange.next(this.shoppingData);
  }
}
