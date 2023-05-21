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

@Component({
  selector: 'app-create-document',
  template: `
    <div class="fx-row fx-gap-10">
      <mat-form-field class="fx-grow">
        <mat-label>Document title</mat-label>
        <input matInput placeholder="Enter document title" />
      </mat-form-field>

      <mat-form-field class="fx-no-grow">
        <mat-label>Language</mat-label>
        <mat-select>
          <mat-option value="de">German</mat-option>
          <mat-option value="en">English</mat-option>
        </mat-select>
      </mat-form-field>

      <button mat-stroked-button class="fx-no-grow">Create</button>
    </div>
  `,
  styleUrls: ['../shared/styles/flex.scss'],
  styles: [],
})
export class CreateDocumentComponent {}
