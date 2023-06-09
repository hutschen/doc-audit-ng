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

import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from './material/material.module';
import { GroupModule } from './group/group.module';
import { RouterModule, Routes } from '@angular/router';
import { ErrorService } from './shared/services/error.service';

const routes: Routes = [{ path: '**', redirectTo: 'groups' }];

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    GroupModule,
    MaterialModule,
    RouterModule.forRoot(routes),
  ],
  providers: [{ provide: ErrorHandler, useClass: ErrorService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
