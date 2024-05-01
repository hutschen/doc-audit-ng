// Copyright (C) 2024 Helmar Hutschenreuter
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
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { Injectable } from '@angular/core';
import { IUploadState, UploadService } from '../shared/services/upload.service';
import { Observable, map, switchMap, takeWhile, timer } from 'rxjs';
import { CRUDService } from '../shared/services/crud.service';

type SourceStatus =
  | 'waiting'
  | 'aborted'
  | 'indexing'
  | 'indexed'
  | 'not found';

export interface ISourceReference {
  id: string;
  status: SourceStatus;
}

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor(
    protected _upload: UploadService,
    protected _crud: CRUDService<null, ISourceReference>
  ) {}

  uploadSource(file: File): Observable<IUploadState<ISourceReference>> {
    return this._upload.upload<ISourceReference>('sources/single', file);
  }

  getSourceStatus(
    id: string,
    interval: number = 5000
  ): Observable<SourceStatus> {
    return timer(0, interval).pipe(
      switchMap(() => this._crud.read(`sources/${id}`)),
      map((source) => source.status)
    );
  }

  deleteSource(id: string): Observable<null> {
    return this._crud.delete(`sources/${id}`);
  }
}
