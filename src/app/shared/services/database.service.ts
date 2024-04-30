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

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface IGroupEntry {
  id?: number;
  name: string;
}

export interface IDocumentEntry {
  id: string; // externally generated UUID
  groupId: number; // Foreign Key of IGroup
  group?: IGroupEntry; // Set when IDocument from Database
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private _db: Dexie;
  private _tableDocuments: Dexie.Table<IDocumentEntry, string>;
  private _tableGroups: Dexie.Table<IGroupEntry, number>;

  constructor() {
    this._db = new Dexie('DocAudit');
    this._db.version(1).stores({
      groups: '++id, name',
      documents: 'id, groupId, title',
    });

    this._tableDocuments = this._db.table('documents');
    this._tableGroups = this._db.table('groups');
  }

  async clearTables(): Promise<void> {
    await this._tableDocuments.clear();
    await this._tableGroups.clear();
  }

  async dropDatabase(): Promise<void> {
    await this._db.delete();
  }

  async listGroups(): Promise<IGroupEntry[]> {
    return this._tableGroups.toArray();
  }

  async addGroup(group: IGroupEntry): Promise<IGroupEntry> {
    const { id, ...group_ } = group;
    group.id = await this._tableGroups.add(group_);
    return group;
  }

  async getGroup(groupId: number): Promise<IGroupEntry> {
    const group = await this._tableGroups.get(groupId);
    if (!group) {
      // FIXME: Define and use own error type for database errors.
      throw new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        error: `Group with id ${groupId} not found`,
      });
    } else {
      return group;
    }
  }

  async updateGroup(group: IGroupEntry): Promise<IGroupEntry> {
    // Split up group object into id and update object
    const { id, ...update } = group;
    if (!id) {
      // FIXME: Define and use own error type for database errors.
      throw new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: 'Group id missing',
      });
    }

    // Perform update and throw error if group was not found
    if (!(await this._tableGroups.update(id, update))) {
      // FIXME: Define and use own error type for database errors.
      throw new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        error: `Group with id ${id} not found`,
      });
    }
    return group;
  }

  async deleteGroup(groupId: number): Promise<void> {
    await this._tableGroups.delete(groupId);
    await this._tableDocuments.where({ groupId: groupId }).delete();
  }

  async listDocuments(groupId: number): Promise<IDocumentEntry[]> {
    const group = await this.getGroup(groupId);
    const documents = await this._tableDocuments
      .where({ groupId: groupId })
      .toArray();
    return documents.map((doc) => {
      doc.group = group;
      return doc;
    });
  }

  async addDocument(document: IDocumentEntry): Promise<IDocumentEntry> {
    const { group, ...document_ } = document;
    const group_ = await this.getGroup(document.groupId);
    document.id = await this._tableDocuments.add(document_);
    document.group = group_;
    return document;
  }

  async getDocument(documentId: string): Promise<IDocumentEntry> {
    const document = await this._tableDocuments.get(documentId);
    if (!document) {
      throw new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        error: `Document with id ${documentId} not found`,
      });
    } else {
      document.group = await this.getGroup(document.groupId);
      return document;
    }
  }

  async updateDocument(document: IDocumentEntry): Promise<IDocumentEntry> {
    const { id, group, ...update } = document;
    const group_ = await this.getGroup(update.groupId);
    if (!(await this._tableDocuments.update(id, update))) {
      throw new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        error: `Document with id ${id} not found`,
      });
    }
    document.group = group_;
    return document;
  }

  async deleteDocument(documentId: string): Promise<void> {
    await this._tableDocuments.delete(documentId);
  }
}
