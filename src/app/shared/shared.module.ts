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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditDialogComponent } from './components/create-edit-dialog.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import { UploadDialogComponent } from './components/upload-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    CreateEditDialogComponent,
    UploadDialogComponent,
    ErrorDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, HttpClientModule],
  exports: [CreateEditDialogComponent, HttpClientModule],
})
export class SharedModule {}
