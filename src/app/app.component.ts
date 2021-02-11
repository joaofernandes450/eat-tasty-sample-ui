import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eat-tasty-sample-ui';

  userInfo: any;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.userInfo = this.authenticationService.userInfo;
  }
}
