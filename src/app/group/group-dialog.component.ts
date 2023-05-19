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

import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Group, IGroupInput } from '../shared/services/group.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GroupDialogService {
  constructor(protected _dialog: MatDialog) {}

  openGroupDialog(group?: Group): MatDialogRef<GroupDialogComponent, Group> {
    return this._dialog.open(GroupDialogComponent, {
      width: '500px',
      data: group,
    });
  }
}

@Component({
  selector: 'app-group-dialog',
  template: `
    <app-create-edit-dialog
      [createMode]="createMode"
      objectName="Group"
      (save)="onSave($event)"
      (cancel)="onCancel()"
    >
      <div class="fx-column">
        <!-- Group name input -->
        <mat-form-field appearance="fill">
          <mat-label>Group name</mat-label>
          <input name="name" matInput [(ngModel)]="groupInput.name" required />
        </mat-form-field>
      </div>
    </app-create-edit-dialog>
  `,
  styleUrls: ['../shared/styles/flex.scss'],
  styles: [],
})
export class GroupDialogComponent {
  createMode = true;
  groupInput: IGroupInput = { name: '' };

  constructor() {}

  onSave(form: NgForm): void {}
  onCancel(): void {}
}
