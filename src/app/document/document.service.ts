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
  constructor() {}
}
