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
import { CRUDService, IPage, IQueryParams } from './crud.service';
import { Observable, map } from 'rxjs';

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
  constructor(protected _crud: CRUDService<IGroupInput, IGroup>) {}

  queryProjects(params: IQueryParams = {}) {
    return this._crud.query('groups', params).pipe(
      map((groups) => {
        if (Array.isArray(groups)) {
          return groups.map((group) => new Group(group));
        } else {
          return {
            ...groups,
            items: groups.items.map((group) => new Group(group)),
          } as IPage<Group>;
        }
      })
    );
  }

  createGroup(groupInput: IGroupInput): Observable<Group> {
    return this._crud
      .create('groups', groupInput)
      .pipe(map((project) => new Group(project)));
  }

  getGroup(groupId: number): Observable<Group> {
    return this._crud
      .read(`groups/${groupId}`)
      .pipe(map((group) => new Group(group)));
  }

  updateGroup(groupId: number, groupInput: IGroupInput): Observable<Group> {
    return this._crud
      .update(`groups/${groupId}`, groupInput)
      .pipe(map((group) => new Group(group)));
  }

  deleteGroup(groupId: number): Observable<null> {
    return this._crud.delete(`groups/${groupId}`);
  }
}
