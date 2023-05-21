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

import { Component, Inject, Injectable } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  Document,
  DocumentService,
  IDocument,
  IDocumentInput,
} from './document.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentDialogService {
  constructor(protected _dialog: MatDialog) {}

  openDocumentDialog(
    document: Document
  ): MatDialogRef<DocumentDialogComponent, Document> {
    return this._dialog.open(DocumentDialogComponent, {
      width: '500px',
      data: document,
    });
  }
}

@Component({
  selector: 'app-document-dialog',
  template: `
    <app-create-edit-dialog
      [createMode]="false"
      objectName="Document"
      (save)="onSave($event)"
      (cancel)="onCancel()"
    >
      <div class="fx-column">
        <mat-form-field appearance="fill">
          <mat-label>Document title</mat-label>
          <input
            name="name"
            matInput
            [(ngModel)]="documentInput.title"
            required
          />
        </mat-form-field>
      </div>
    </app-create-edit-dialog>
  `,
  styleUrls: ['../shared/styles/flex.scss'],
  styles: [],
})
export class DocumentDialogComponent {
  documentInput!: IDocumentInput;

  constructor(
    protected _dialogRef: MatDialogRef<DocumentDialogComponent>,
    protected _documentService: DocumentService,
    @Inject(MAT_DIALOG_DATA) protected _document: Document
  ) {
    this.documentInput = this._document.toDocumentInput();
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      const document$ = this._documentService.updateDocument(
        this._document.id,
        this.documentInput
      );
      document$.subscribe((document) => this._dialogRef.close(document));
    }
  }

  onCancel(): void {
    this._dialogRef.close();
  }
}
