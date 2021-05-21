import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {
  }

  notify(message: string) {
    this._snackBar.open(message, 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
