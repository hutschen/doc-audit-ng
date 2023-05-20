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
import { GroupListComponent } from './group-list.component';
import { MaterialModule } from '../material/material.module';
import { GroupDialogComponent } from './group-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { GroupViewComponent } from './group-view.component';
import { RouterModule, Routes } from '@angular/router';
import { GroupResolver, GroupsResolver } from './group-resolver.service';

const routes: Routes = [
  {
    path: 'groups',
    resolve: { groups: GroupsResolver },
    component: GroupViewComponent,
  },
  {
    path: 'groups/:groupId',
    resolve: { groups: GroupsResolver, group: GroupResolver },
    component: GroupViewComponent,
  },
];

@NgModule({
  declarations: [GroupListComponent, GroupDialogComponent, GroupViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [GroupListComponent],
})
export class GroupModule {}
