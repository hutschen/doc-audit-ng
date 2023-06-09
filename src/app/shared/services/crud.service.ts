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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IPage<T> {
  items: T[];
  total_count: number;
}

export interface IQueryParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class CRUDService<InputType, OutputType> {
  constructor(protected _httpClient: HttpClient) {}

  toAbsoluteUrl(relativeUrl: string): string {
    return `${environment.baseUrl}/${relativeUrl}`;
  }

  protected get _httpOptions(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  query(
    relativeUrl: string,
    params: IQueryParams = {}
  ): Observable<OutputType[] | IPage<OutputType>> {
    return this._httpClient.get<OutputType[]>(this.toAbsoluteUrl(relativeUrl), {
      params,
      ...this._httpOptions,
    });
  }

  create(relativeUrl: string, itemInput: InputType): Observable<OutputType> {
    return this._httpClient.post<OutputType>(
      this.toAbsoluteUrl(relativeUrl),
      itemInput,
      this._httpOptions
    );
  }

  read(relativeUrl: string): Observable<OutputType> {
    return this._httpClient.get<OutputType>(
      this.toAbsoluteUrl(relativeUrl),
      this._httpOptions
    );
  }

  update(relativeUrl: string, itemInput: InputType): Observable<OutputType> {
    return this._httpClient.put<OutputType>(
      this.toAbsoluteUrl(relativeUrl),
      itemInput,
      this._httpOptions
    );
  }

  delete(relativeUrl: string): Observable<null> {
    return this._httpClient.delete<null>(
      this.toAbsoluteUrl(relativeUrl),
      this._httpOptions
    );
  }
}
