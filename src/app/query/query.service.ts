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
import { IDocument, Document } from '../document/document.service';
import {
  CRUDService,
  IPage,
  IQueryParams,
} from '../shared/services/crud.service';
import { map } from 'rxjs';

export interface IQueryResult {
  score: number;
  content: string;
  headers: string[];
  document: IDocument;
}

export class QueryResult implements IQueryResult {
  score: number;
  content: string;
  headers: string[];
  document: Document;

  constructor(queryResult: IQueryResult) {
    this.score = queryResult.score;
    this.content = queryResult.content;
    this.headers = queryResult.headers;
    this.document = new Document(queryResult.document);
  }
}

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor() {}
}
