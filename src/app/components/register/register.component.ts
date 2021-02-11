import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';

import { Gallery, GalleryRef } from 'ng-gallery';
import { DataService } from 'src/app/services/data/data.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Router } from '@angular/router';
import { NotificationSnackbarService } from 'src/app/services/notification-snackbar/notification-snackbar.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

export class CustomValidators {

  /**
   * Email pattern validator
   */
  static email(): ValidatorFn {
    return Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }

  /**
   * Phone number Portuguese pattern validator
   */
  static phoneNumber(): ValidatorFn {
    return Validators.pattern("^9(1|2|3|6)[0-9]{7}$")
  }

  /**
   * Autocomplete match validator
   * @param addressOptionsArray - Address options as array
   */
  static valueSelected(addressOptionsArray: any[]): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let value = c.value;
      let isValueAnAddress = addressOptionsArray.includes(value);
      if (isValueAnAddress) {
        return null;
      } else {
        return { match: true };
      }
    };
  }

  /**
   * Password and confirm password match validator
   * @param control - Angular's form AbstractControl
   */
  static passwordMatch(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    if (confirmPassword) {
      if (password !== confirmPassword) {
        control.get('confirmPassword').setErrors({ passwordDoNotMatch: true });
      }
    }
  }
}

interface Address {
  street: string,
  postalCode: string,
  city: string,
  latitude: number,
  longitude: number
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dataLoaded: boolean = false;

  registerFirstFormGroup: FormGroup;
  registerSecondFormGroup: FormGroup;
  registerThirdFormGroup: FormGroup;

  galleryId = 'gallery';

  addressOptions: Address[] = [
    { street: "Rua Irene Lisboa", postalCode: "2650-234", city: "Amadora", latitude: 38.768317, longitude: -9.219275 },
    { street: "Travessa da Couraça Estrela", postalCode: "3000-026", city: "Coimbra", latitude: 40.207020, longitude: -8.429049 },
    { street: "Rua Nova da Alfândega", postalCode: "80-182", city: "Porto", latitude: 41.144041, longitude: -8.622909 },
  ]
  filteredOptions: Observable<Address[]>;
  currentAddress: Address;

  isFirstFormGroupValid: boolean = false;

  availableCountriesList: string[] = [];

  doneButtonPressed: boolean = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private gallery: Gallery, private dataService: DataService, private loadingService: LoadingService, private router: Router, private notificationService: NotificationSnackbarService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.getAvailableCountriesList();
    this.renderGallery();
    this.filteredOptions = this.registerFirstFormGroup.get('verifyAddress').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  /**
   * Creates the Register Form
   */
  createRegisterForm(): void {
    this.registerFirstFormGroup = this.fb.group({
      verifyAddress: ['', [Validators.required, CustomValidators.valueSelected(this.addressOptions)]],
    })
    this.registerSecondFormGroup = this.fb.group({
      delivery: ['',],
      deliveryType: ['residential'],
      floor: [''],
      otherInfo: [''],
      driverInfo: ['']
    })
    this.registerThirdFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.email()]],
      phoneNumber: ['', [Validators.required, CustomValidators.phoneNumber()]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      confirmPassword: ['', Validators.required],
      vat: [''],
      country: ['Portugal', Validators.required],
      tos: [false, Validators.requiredTrue]
    },
      { validator: CustomValidators.passwordMatch })
  }

  getAvailableCountriesList(): void {
    this.availableCountriesList = this.dataService.getCountries();
  }

  /**
   * Opens Address Validation Dialog when prompted
   */
  openAddressValidationDialog(data: any): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: data,
      width: '80vw',
      maxWidth: '80vw',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isFirstFormGroupValid = true;
        this.currentAddress = data;
      } else {
        this.isFirstFormGroupValid = false;
        this.registerFirstFormGroup.reset();
        this.currentAddress = null;
      }
    })
  }

  /**
   * Handles the Image Gallery configuration
   */
  renderGallery(): void {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
    galleryRef.addImage({
      src: '/assets/1.jpg',
      title: 'Some title'
    });
    galleryRef.addImage({
      src: '/assets/2.jpg',
      title: 'Some title'
    }); galleryRef.addImage({
      src: '/assets/3.jpg',
      title: 'Some title'
    }); galleryRef.addImage({
      src: '/assets/4.jpg',
      title: 'Some title'
    });
    this.dataLoaded = true;
  }

  /**
   * Autocomplete filter
   * @param value - filter value
   */
  private _filter(value: any): Address[] {
    if (value && !value.city) {
      const filterValue = value.toLowerCase();
      return this.addressOptions.filter(option => option.city.toLocaleLowerCase().includes(filterValue) || option.postalCode.toLocaleLowerCase().includes(filterValue) || option.street.toLocaleLowerCase().includes(filterValue));
    } else {
      return this.addressOptions;
    }
  }

  /**
   * Autocomplete selection event
   * @param event - DOM event
   */
  autoCompleteEvent(event: any) {
    this.openAddressValidationDialog(event.option.value);
  }

  /**
   * Returns the autocomplete option selected text, to prvent [object object] from showing
   * @param option 
   */
  getOptionText(option): string {
    if (option) return option.street + ', ' + option.city + ' : ' + option.postalCode;
  }

  /**
   * Called when User presses the "Register" button
   */
  registerUser(): void {
    this.doneButtonPressed = true;
    if (this.registerThirdFormGroup.valid) {
      const deliveryInformation = {
        name: this.registerSecondFormGroup.get('delivery').value,
        type: this.registerSecondFormGroup.get('deliveryType').value,
        floor: this.registerSecondFormGroup.get('floor').value,
        otherInfo: this.registerSecondFormGroup.get('otherInfo').value,
        driverInfo: this.registerSecondFormGroup.get('driverInfo').value,
      };
      this.loadingService.showLoadingSpinner();
      this.authenticationService.registerUser(this.registerThirdFormGroup.get('firstName').value, this.registerThirdFormGroup.get('lastName').value, this.registerThirdFormGroup.get('email').value,
        this.registerThirdFormGroup.get('phoneNumber').value, this.registerFirstFormGroup.get('verifyAddress').value, deliveryInformation, this.registerThirdFormGroup.get('password').value, this.registerThirdFormGroup.get('vat').value).subscribe(data => {
          setTimeout(() => {
            if (data && data.success) {
              this.loadingService.stopLoadingSpinner();
              this.notificationService.showSuccess('Welcome to EatTasty. You can now login using your credentials!')
              this.router.navigate(['/login']);
            } else {
              this.loadingService.stopLoadingSpinner();
              this.notificationService.showError(data.message);
            }
          }, 2000)
        })
    }
  }

  /**
   * Returns terms of service error message
   */
  termsOfServiceErrorMessage(): string {
    return 'Please accept the terms of service before proceding!'
  }
}
