import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  userInfo: any;

  shoppingCartItems: number;

  constructor(private authenticationService: AuthenticationService, private shoppingCartService: ShoppingCartService) {
    this.userInfo = this.authenticationService.userInfo;
    this.authenticationService.authenticationSubject.subscribe(sub => {
      sub ? this.userInfo = sub : this.userInfo = null;
    })
    this.shoppingCartItems = this.shoppingCartService.shoppingData.length;
    this.shoppingCartService.shoppingDataChange.subscribe(value => {
      this.shoppingCartItems = value.length;
    })
  }

  /**
   * Called on user logout
   */
  userLogout() {
    this.authenticationService.userLogout();
  }
}
