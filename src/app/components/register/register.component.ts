import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';

import { Gallery, GalleryRef } from 'ng-gallery';

export class CustomValidators {
  static phoneNumber(): ValidatorFn {
    return Validators.pattern("^9{1,2,3,6}[0-9]{8}$")
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

  galleryId = 'mixedExample';

  addressOptions: Address[] = [
    { street: "Rua Irene Lisboa", postalCode: "2650-234", city: "Amadora", latitude: 38.768317, longitude: -9.219275 },
    { street: "Travessa da Couraça Estrela", postalCode: "3000-026", city: "Coimbra", latitude: 40.207020, longitude: -8.429049 },
    { street: "Rua Nova da Alfândega", postalCode: "80-182", city: "Porto", latitude: 41.144041, longitude: -8.622909 },
  ]
  filteredOptions: Observable<Address[]>;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private gallery: Gallery) { }

  ngOnInit(): void {
    this.createRegisterForm();
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
      verifyAddress: ['', Validators.required],
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
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phoneNumber: ['', [Validators.required, CustomValidators.phoneNumber()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      vat: [''],
      country: ['Portugal', Validators.required]
    })
  }

  /**
   * Opens Address Validation Dialog when prompted
   */
  openAddressValidationDialog(data: any): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      } else {
        this.registerFirstFormGroup.reset();
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
      console.log(value)
      const filterValue = value.toLowerCase();
      return this.addressOptions.filter(option => option.city.toLocaleLowerCase().includes(filterValue) || option.postalCode.toLocaleLowerCase().includes(filterValue) || option.street.toLocaleLowerCase().includes(filterValue));
    }
  }

  /**
   * Autocomplete selection event
   * @param event - DOM event
   */
  autoCompleteEvent(event: any) {
    this.openAddressValidationDialog(event.option.value);
  }
}
