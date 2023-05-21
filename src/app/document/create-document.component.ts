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
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IDocumentInput, Language } from './document.service';

/** Error when invalid control is dirty, touched, or submitted. */
class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(): boolean {
    return false;
  }
}

@Component({
  selector: 'app-create-document',
  template: `
    <form
      #docForm="ngForm"
      (ngSubmit)="onSubmit(docForm)"
      class="fx-row fx-gap-10"
    >
      <mat-form-field class="fx-grow">
        <mat-label>Document title</mat-label>
        <input
          matInput
          [errorStateMatcher]="errorStateMatcher"
          name="title"
          [(ngModel)]="documentTitle"
          placeholder="Enter document title"
          required
        />
      </mat-form-field>

      <mat-form-field class="fx-no-grow">
        <mat-label>Language</mat-label>
        <mat-select
          name="language"
          [(ngModel)]="documentLanguage"
          [errorStateMatcher]="errorStateMatcher"
          required
        >
          <mat-option value="de">German</mat-option>
          <mat-option value="en">English</mat-option>
        </mat-select>
      </mat-form-field>

      <button
        type="submit"
        mat-flat-button
        class="fx-no-grow square-button"
        matTooltip="Create Document"
        color="accent"
        [disabled]="!docForm.valid"
      >
        <mat-icon class="no-margin">add</mat-icon>
      </button>
    </form>
  `,
  styleUrls: ['../shared/styles/flex.scss'],
  styles: [
    '.square-button { width: 56px; height: 56px; }',
    '.no-margin { margin: 0; }',
  ],
})
export class CreateDocumentComponent {
  documentTitle = '';
  documentLanguage: Language = 'de';
  errorStateMatcher = new CustomErrorStateMatcher();

  onSubmit(form: NgForm) {
    const documentInput: IDocumentInput = {
      title: this.documentTitle,
      language: this.documentLanguage,
    };
    form.resetForm({ language: 'de' });
    // TODO: Use Upload dialog to upload document
  }
}
