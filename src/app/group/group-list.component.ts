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
  selector: 'app-group-list',
  template: `
    <button mat-stroked-button>
      <mat-icon>add</mat-icon>
      New Group
    </button>
    <mat-nav-list>
      <mat-list-item class="active">Item 1</mat-list-item>
      <mat-list-item>Item 2</mat-list-item>
      <mat-list-item>Item 3</mat-list-item>
    </mat-nav-list>
  `,
  styles: [
    'button {width: 100%; justify-content: left} .active {background-color: #ccc}',
    'mat-list-item {border-radius: 4px}',
    '.active {background-color: rgba(0, 0, 0, 0.20);}',
  ],
})
export class GroupListComponent {
  onClick() {}
}
