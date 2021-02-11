import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gallery, GalleryRef } from 'ng-gallery';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { NotificationSnackbarService } from 'src/app/services/notification-snackbar/notification-snackbar.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataLoaded: boolean = false;

  loginForm: FormGroup;

  hidePassword: boolean = true;
  recoverPassword: boolean = false;

  galleryId = 'gallery';

  constructor(private fb: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private gallery: Gallery, private loadingService: LoadingService, private notificationService: NotificationSnackbarService) {
  }

  ngOnInit(): void {
    this.createLoginForm();
    this.renderGallery();
  }

  /**
   * Login Form
   */
  createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email()]],
      password: ['', [Validators.required]]
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
   * Login form event when submitted
   */
  userLogin(): void {
    if (this.loginForm.valid) {
      this.loadingService.showLoadingSpinner();
      this.authenticationService.userLogin(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(data => {
        setTimeout(() => {
          if (data && data.success) {
            this.loadingService.stopLoadingSpinner();
            this.notificationService.showSuccess('Welcome back!')
            this.router.navigate(['/app/home']);
          } else {
            this.loadingService.stopLoadingSpinner();
            this.notificationService.showError(data.message);
          }
        }, 2000)
      })
    }
  }
}
