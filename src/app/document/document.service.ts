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
import { CRUDService } from '../shared/services/crud.service';
import { Observable, concatMap, from, map, of } from 'rxjs';
import { IUploadState, UploadService } from '../shared/services/upload.service';
import { DatabaseService } from '../shared/services/database.service';
import { SourceService } from '../source/source.service';

export type Language = 'de' | 'en';

export interface IDocumentInput {
  title: string;
  language: Language;
  groupId: number;
}

export interface IDocument extends IDocumentInput {
  id: number;
  sourceId: string;
  group: IGroup;
}

export class Document implements IDocument {
  id: number;
  title: string;
  language: Language;
  sourceId: string;
  groupId: number;
  group: Group;

  constructor(document: IDocument) {
    this.id = document.id;
    this.title = document.title;
    this.language = document.language;
    this.sourceId = document.sourceId;
    this.groupId = document.groupId;
    this.group = new Group(document.group);
  }

  toDocumentInput(): IDocumentInput {
    return {
      title: this.title,
      language: this.language,
      groupId: this.groupId,
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(
    protected _database: DatabaseService,
    protected _sources: SourceService,
    protected _crud: CRUDService<IDocumentInput, IDocument>,
    protected _upload: UploadService
  ) {}

  queryDocuments(groupId: number): Observable<Document[]> {
    return from(this._database.listDocuments(groupId)).pipe(
      map((entries) => {
        return entries.map(
          (entry) => new Document({ language: 'de', ...entry } as IDocument)
        );
      })
    );
  }

  createDocument(documentInput: IDocumentInput, file: File) {
    return this._sources.uploadSource(file).pipe(
      concatMap((uploadState) => {
        if (uploadState.state === 'done') {
          return from(
            this._database.addDocument({
              ...documentInput,
              sourceId: uploadState.result!.id,
            })
          ).pipe(
            map((entry) => ({ ...entry, language: 'de' } as IDocument)),
            map(
              (document) =>
                ({
                  ...uploadState,
                  result: document,
                } as IUploadState<IDocument>)
            )
          );
        } else {
          return of({
            ...uploadState,
            result: undefined,
          } as IUploadState<IDocument>);
        }
      })
    );
  }

  getDocument(documentId: number): Observable<Document> {
    return from(this._database.getDocument(documentId)).pipe(
      map((entry) => new Document({ language: 'de', ...entry } as IDocument))
    );
  }

  updateDocument(
    documentId: number,
    documentInput: IDocumentInput
  ): Observable<Document> {
    // Get the document from the database to get the sourceId
    return from(this._database.getDocument(documentId)).pipe(
      // Merge the documentInput with the sourceId to get a full DocumentEntry
      map((entry) => ({
        id: documentId,
        sourceId: entry.sourceId,
        ...documentInput,
      })),
      // Perform updating the DocumentEntry in the database
      concatMap((entry) => this._database.updateDocument(entry)),
      map((entry) => new Document({ language: 'de', ...entry } as IDocument))
    );
  }

  deleteDocument(documentId: number): Observable<void> {
    return from(this._database.deleteDocument(documentId));
  }
}
