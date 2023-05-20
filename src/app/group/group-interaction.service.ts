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

import { Injectable } from '@angular/core';
import { Interaction, InteractionService } from '../shared/interaction';
import { Group, GroupService } from './group.service';
import { Subject, firstValueFrom } from 'rxjs';
import { GroupDialogService } from './group-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class GroupInteractionService implements InteractionService<Group> {
  protected _interactionSubject = new Subject<Interaction<Group>>();
  readonly interactions$ = this._interactionSubject.asObservable();

  constructor(
    protected _groupService: GroupService,
    protected _groupDialogService: GroupDialogService
  ) {}
  // TODO: Add confirm dialog and corresponding service

  protected async _createOrEditGroup(group?: Group): Promise<void> {
    const dialogRef = this._groupDialogService.openGroupDialog(group);
    const resultingGroup = await firstValueFrom(dialogRef.afterClosed());
    if (resultingGroup) {
      this._interactionSubject.next({
        item: resultingGroup,
        action: group ? 'update' : 'create',
      });
    }
  }

  async onCreateGroup(): Promise<void> {
    await this._createOrEditGroup();
  }

  async onEditGroup(group: Group): Promise<void> {
    await this._createOrEditGroup(group);
  }
}
