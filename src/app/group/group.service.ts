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
import { Observable, from, map } from 'rxjs';
import { DatabaseService } from '../shared/services/database.service';

export interface IGroupInput {
  name: string;
}

export interface IGroup extends IGroupInput {
  id: number;
}

export class Group implements IGroup {
  id: number;
  name: string;

  constructor(group: IGroup) {
    this.id = group.id;
    this.name = group.name;
  }

  toGroupInput(): IGroupInput {
    return {
      name: this.name,
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private _database: DatabaseService) {}

  queryGroups(): Observable<Group[]> {
    return from(this._database.listGroups()).pipe(
      map((entries) => {
        return entries.map((entry) => new Group(entry as IGroup));
      })
    );
  }

  createGroup(groupInput: IGroupInput): Observable<Group> {
    return from(this._database.addGroup(groupInput)).pipe(
      map((entry) => new Group(entry as IGroup))
    );
  }

  getGroup(groupId: number): Observable<Group> {
    return from(this._database.getGroup(groupId)).pipe(
      map((entry) => new Group(entry as IGroup))
    );
  }

  updateGroup(groupId: number, groupInput: IGroupInput): Observable<Group> {
    return from(
      this._database.updateGroup({ id: groupId, ...groupInput })
    ).pipe(map((entry) => new Group(entry as IGroup)));
  }

  deleteGroup(groupId: number): Observable<void> {
    return from(this._database.deleteGroup(groupId));
  }
}
