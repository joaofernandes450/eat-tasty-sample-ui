import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationSnackbarService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone) { }

  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', { panelClass: ['snackbar-success'], duration: 10000 });
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', { panelClass: ['snackbar-error'], duration: 10000 });
    });
  }
}
