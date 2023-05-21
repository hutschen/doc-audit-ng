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

import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, scan } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQueryParams } from './crud.service';

export interface IUploadState<T = any> {
  state: 'pending' | 'in_progress' | 'done';
  progress: number;
  result?: T;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(protected _httpClient: HttpClient) {}

  // FIXME: this is a duplicate of the method in the CRUDService
  toAbsoluteUrl(relativeUrl: string): string {
    return `${environment.baseUrl}/${relativeUrl}`;
  }

  protected _caculateState<T>(
    previousState: IUploadState<T>,
    event: HttpEvent<any>
  ): IUploadState<T> {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return {
          ...previousState,
          state: 'in_progress',
          progress: event.total
            ? Math.round((100 * event.loaded) / event.total)
            : previousState.progress,
        };
      case HttpEventType.Response:
        // get the response body
        return {
          ...previousState,
          state: 'done',
          result: event.body,
        };
      default:
        return previousState;
    }
  }

  upload<T>(
    relativeUrl: string,
    file: File,
    params: IQueryParams = {}
  ): Observable<IUploadState<T>> {
    const initialState: IUploadState<T> = {
      state: 'pending',
      progress: 0,
    };

    const formData = new FormData();
    formData.append('upload_file', file);
    return this._httpClient
      .post(this.toAbsoluteUrl(relativeUrl), formData, {
        observe: 'events',
        params: params,
        reportProgress: true,
      })
      .pipe(
        scan((prev, event) => this._caculateState<T>(prev, event), initialState)
      );
  }
}
