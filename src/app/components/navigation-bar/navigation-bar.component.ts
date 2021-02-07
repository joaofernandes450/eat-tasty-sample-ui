import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  userInfo: any;

  constructor(private authenticationService: AuthenticationService) {
    this.userInfo = this.authenticationService.userInfo;
    this.authenticationService.authenticationSubject.subscribe(sub => {
      sub ? this.userInfo = sub : this.userInfo = null;
    })
  }

  /**
   * Called on user logout
   */
  userLogout() {
    this.authenticationService.userLogout();
  }
}
