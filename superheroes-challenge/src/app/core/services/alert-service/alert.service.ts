import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }

  error(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
  }
}
