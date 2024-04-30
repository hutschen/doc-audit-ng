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
import { IDocument, DocumentService } from '../document/document.service';
import {
  CRUDService,
  IPage,
  IQueryParams,
} from '../shared/services/crud.service';
import { Observable, map, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface IQueryResultLocation {
  id: string;
  type: string;
  path: string[];
}

export interface IQueryResultDocumentLocation extends IQueryResultLocation {
  document: IDocument;
}

export interface IQueryResult {
  score: number;
  content: string;
  locations: IQueryResultLocation[];
}

export class QueryResult implements IQueryResult {
  score: number;
  content: string;
  locations: IQueryResultDocumentLocation[];

  constructor(queryResult: IQueryResult, documents: IDocument[] = []) {
    this.score = queryResult.score;
    this.content = queryResult.content;
    this.locations = queryResult.locations.map((location) => {
      const document = documents.find((doc) => doc.id === location.id);
      if (!document) {
        // FIXME: Define and use own error type this type of error
        throw new HttpErrorResponse({
          status: 404,
          statusText: 'Not Found',
          error: `Document with ID ${location.id} not found in documents array`,
        });
      }
      return { ...location, document };
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(protected _crud: CRUDService<null, IQueryResult>) {}

  queryResults(groupId: number, content: string, topK: number) {
    const params: IQueryParams = {
      content,
      top_k: topK,
    };
    return this._crud.query(`groups/${groupId}/query`, params).pipe(
      map((queryResults) => {
        if (Array.isArray(queryResults)) {
          return queryResults.map((result) => new QueryResult(result));
        } else {
          return {
            ...queryResults,
            items: queryResults.items.map((result) => new QueryResult(result)),
          } as IPage<QueryResult>;
        }
      })
    );
  }
}
