// Copyright (C) 2023 Helmar Hutschenreuter
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog.component';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

export class ErrorReport {
  code?: number;
  title?: string;
  detail: string;

  constructor(public error: any) {
    if (this.error instanceof HttpErrorResponse) {
      this.code = this.error.status;
      this.title = this.error.statusText;
      this.detail = this.error.error.detail || 'Unknown error';
    } else {
      this.detail = this.error.message || 'Unknown error';
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService implements ErrorHandler {
  protected _dialogRef?: MatDialogRef<ErrorDialogComponent>;
  protected _errorReportsSubject = new Subject<any>();
  protected _errorReports$ = this._errorReportsSubject.asObservable();

  constructor(protected _injector: Injector) {}

  openErrorDialog(error: any): void {
    // open dialog when it is not already open
    if (!this._dialogRef) {
      const dialog = this._injector.get(MatDialog);
      this._dialogRef = dialog.open(ErrorDialogComponent, {
        width: '500px',
        data: this._errorReports$,
      });
      this._dialogRef.afterClosed().subscribe(() => {
        this._dialogRef = undefined;
      });
    }

    // push error to error subject to report it
    this._errorReportsSubject.next(new ErrorReport(error));
  }

  handleError(error: any): void {
    error = error.rejection || error;
    if (error instanceof HttpErrorResponse) {
      const ngZone = this._injector.get(NgZone);
      ngZone.run(() => this.openErrorDialog(error));
    } else {
      console.error('Unhandled error', error);
    }
  }
}
