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
import { Group, IGroup } from '../group/group.service';
import {
  CRUDService,
  IPage,
  IQueryParams,
} from '../shared/services/crud.service';
import { Observable, map } from 'rxjs';

type Language = 'de' | 'en';

export interface IDocumentInput {
  title: string;
  language: Language;
}

export interface IDocument extends IDocumentInput {
  id: number;
  group: IGroup;
}

export class Document implements IDocument {
  id: number;
  title: string;
  language: Language;
  group: Group;

  constructor(document: IDocument) {
    this.id = document.id;
    this.title = document.title;
    this.language = document.language;
    this.group = new Group(document.group);
  }

  toDocumentInput(): IDocumentInput {
    return {
      title: this.title,
      language: this.language,
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(protected _crud: CRUDService<IDocumentInput, IDocument>) {}

  queryDocuments(params: IQueryParams = {}) {
    return this._crud.query('documents', params).pipe(
      map((documents) => {
        if (Array.isArray(documents)) {
          return documents.map((document) => new Document(document));
        } else {
          return {
            ...documents,
            items: documents.items.map((document) => new Document(document)),
          } as IPage<Document>;
        }
      })
    );
  }

  // TODO: Implement file upload before implementing createDocument

  getDocument(documentId: number): Observable<Document> {
    return this._crud
      .read(`documents/${documentId}`)
      .pipe(map((document) => new Document(document)));
  }

  updateDocument(document: Document): Observable<Document> {
    return this._crud
      .update(`documents/${document.id}`, document.toDocumentInput())
      .pipe(map((document) => new Document(document)));
  }

  deleteDocument(documentId: number): Observable<null> {
    return this._crud.delete(`documents/${documentId}`);
  }
}
