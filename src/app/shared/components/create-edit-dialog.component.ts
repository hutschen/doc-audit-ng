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

import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-create-edit-dialog',
  template: `
    <!-- Title -->
    <div mat-dialog-title>
      <span *ngIf="createMode">Create</span>
      <span *ngIf="!createMode">Edit</span>
      <span>&nbsp;</span>
      <span>{{ objectName }}</span>
    </div>

    <!-- Content -->
    <div mat-dialog-content>
      <form id="createEditForm" #form="ngForm" (submit)="save.emit(form)">
        <ng-content></ng-content>
      </form>
    </div>

    <!-- Actions -->
    <div mat-dialog-actions align="end">
      <button mat-button (click)="cancel.emit()">
        <mat-icon>cancel</mat-icon>
        Cancel
      </button>
      <button
        mat-raised-button
        color="accent"
        [disabled]="form.invalid"
        type="submit"
        form="createEditForm"
      >
        <mat-icon>save</mat-icon>
        <span>&nbsp;</span>
        <span *ngIf="createMode">Create</span>
        <span *ngIf="!createMode">Save</span>
      </button>
    </div>
  `,
  styles: [],
})
export class CreateEditDialogComponent implements AfterViewInit {
  @Input() createMode: boolean = true;
  @Input() objectName: string = 'Entity';
  @Output() save = new EventEmitter<NgForm>();
  @Output() cancel = new EventEmitter();

  @ViewChild(NgForm) form?: NgForm;
  @ContentChildren(NgModel, { descendants: true }) models?: QueryList<NgModel>;

  constructor() {}

  ngAfterViewInit(): void {
    // Add models to form
    this.models?.forEach((model) => {
      this.form?.addControl(model);
    });
  }
}
