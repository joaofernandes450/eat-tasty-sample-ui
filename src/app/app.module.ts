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

// Packages
import { IvyCarouselModule } from 'angular-responsive-carousel';

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

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavigationBarComponent,
    LoginComponent,
    UserHomepageComponent,
    RegisterComponent,
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
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
