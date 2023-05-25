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
import { Group, GroupService, IGroupInput } from './group.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

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
  groupInput: IGroupInput = { name: '' };

  constructor(
    protected _dialogRef: MatDialogRef<GroupDialogComponent>,
    protected _groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) protected _group?: Group
  ) {
    if (this._group) {
      this.groupInput = this._group.toGroupInput();
    }
  }

  get createMode(): boolean {
    return !this._group;
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      let group$: Observable<Group>;
      if (!this._group) {
        group$ = this._groupService.createGroup(this.groupInput);
      } else {
        group$ = this._groupService.updateGroup(
          this._group.id,
          this.groupInput
        );
      }
      group$.subscribe((group) => this._dialogRef.close(group));
    }
  }

  onCancel(): void {
    this._dialogRef.close();
  }
}
