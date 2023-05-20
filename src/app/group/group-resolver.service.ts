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
import { Group, GroupService } from './group.service';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';
import { toInt } from 'radash';
import { HttpErrorResponse } from '@angular/common/http';

// FIXME: Replace by a functional resolver
@Injectable({
  providedIn: 'root',
})
export class GroupResolver implements Resolve<Group> {
  protected _errorRoute = ['/groups'];

  constructor(
    protected _router: Router,
    protected _groupService: GroupService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Group> {
    const groupId = toInt(route.paramMap.get('groupId'), null);
    if (groupId === null) {
      this._router.navigate(this._errorRoute);
      return EMPTY;
    }

    return this._groupService.getGroup(groupId).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this._router.navigate(this._errorRoute);
          return EMPTY;
        } else {
          throw error;
        }
      })
    );
  }
}
