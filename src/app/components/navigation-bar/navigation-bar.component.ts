import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/overlay';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  name = 'Angular';
  fillerContent = Array(50).fill(0).map(() =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua.`);

  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer: MatSidenavContainer;
  @ViewChild(CdkScrollable, { static: true }) scrollable: CdkScrollable;
  @ViewChild(MatSidenavContent, { static: true }) content: MatSidenavContent;
  @ViewChild('toolBara', { static: true }) toolbar: MatToolbar;

  ngAfterViewInit() {
    this.scrollable.elementScrolled().subscribe(() => {
      const scrollTop = this.sidenavContainer.scrollable.getElementRef().nativeElement.scrollTop;
      if (scrollTop > 0) {
        this.toolbar._elementRef.nativeElement.classList.add('sticky');
        this.toolbar._elementRef.nativeElement.classList.remove('fixed');
        // console.log('SCroll', "sticky");
      } else {
        this.toolbar._elementRef.nativeElement.classList.add('fixed');
        this.toolbar._elementRef.nativeElement.classList.remove('sticky');
      }
    });
  }

  ngOnInit() {

  }
}
