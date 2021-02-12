import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// FlexLayout Module
import { FlexLayoutModule } from "@angular/flex-layout";

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

// Packages
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { GalleryModule } from 'ng-gallery';

// Google Maps
import { AgmCoreModule } from '@agm/core';

// Components & Routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LoginComponent } from './components/login/login.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { RegisterComponent } from './components/register/register.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { FoodInfoComponent } from './components/food-info/food-info.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavigationBarComponent,
    LoginComponent,
    UserHomepageComponent,
    RegisterComponent,
    AddressDialogComponent,
    LoadingSpinnerComponent,
    FoodInfoComponent,
    ShoppingCartComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    IvyCarouselModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQvl6bTYhrYsvSDAqaUzrVcd_tMG326pM',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    MatDialogModule,
    GalleryModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatTabsModule,
    MatTableModule,
    MatBadgeModule,
    MatDividerModule
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
