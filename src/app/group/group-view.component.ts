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
  selector: 'app-group-view',
  template: `
    <div class="header fx-row">
      <div class="header-content fx-row fx-gap-10">
        <button class="icon-button" mat-stroked-button matTooltip="Edit Group">
          <mat-icon class="no-margin">edit</mat-icon>
        </button>
        <button
          class="icon-button"
          mat-stroked-button
          matTooltip="Delete Group"
        >
          <mat-icon class="no-margin">delete</mat-icon>
        </button>
      </div>
      <mat-divider vertical></mat-divider>
      <div class="header-content">
        <button mat-flat-button color="accent">
          <mat-icon>bolt</mat-icon>
          Query
        </button>
      </div>
    </div>
    <mat-divider></mat-divider>
    <div class="content">
      <p>group-view works!</p>
    </div>
  `,
  styleUrls: ['../shared/styles/flex.scss', '../shared/styles/truncate.scss'],
  styles: [
    '.header-content { padding: 16px; box-sizing: border-box; }',
    '.no-margin { margin: 0; }',
    '.icon-button { min-width: 0px; }',
  ],
})
export class GroupViewComponent {}
