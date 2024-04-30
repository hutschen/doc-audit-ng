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

import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  afterEach(async () => {
    // Empty the tables after each test
    await service.clearTables();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list groups', async () => {
    const groups = await service.listGroups();
    expect(groups).toEqual([]);
  });

  it('should add group', async () => {
    const group = await service.addGroup({ name: 'test' });
    expect(group.id).toBeDefined();
    expect(group.name).toBe('test');
  });

  it('should list added group', async () => {
    const group = await service.addGroup({ name: 'test' });
    const groups = await service.listGroups();
    expect(groups).toEqual([group]);
  });

  it('should get group', async () => {
    const group = await service.addGroup({ name: 'test' });
    const fetchedGroup = await service.getGroup(group.id!);
    expect(fetchedGroup).toEqual(group);
  });

  it('should throw 404 when getting non-existing group', async () => {
    try {
      await service.getGroup(42);
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);
    }
  });

  it('should update group', async () => {
    const group = await service.addGroup({ name: 'test' });
    group.name = 'updated';
    const updatedGroup = await service.updateGroup(group);
    expect(updatedGroup).toEqual(group);
  });

  it('should throw 400 when updating group without id', async () => {
    try {
      await service.updateGroup({ name: 'test' });
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(400);
    }
  });

  it('should throw 404 when updating non-existing group', async () => {
    try {
      await service.updateGroup({ id: 42, name: 'test' });
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);
    }
  });

  it('should delete group', async () => {
    const group = await service.addGroup({ name: 'test' });
    await service.deleteGroup(group.id!);
    try {
      await service.getGroup(group.id!);
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);
    }
  });

  it('should not throw an error when deleting non-existing group', async () => {
    await service.deleteGroup(42);
  });

  it('should list documents', async () => {
    const group = await service.addGroup({ name: 'test' });
    const documents = await service.listDocuments(group.id!);
    expect(documents).toEqual([]);
  });

  it('should throw 404 when listing documents for non-existing group', async () => {
    try {
      await service.listDocuments(42);
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);
    }
  });

  it('should add document', async () => {
    const group = await service.addGroup({ name: 'test' });
    const document = await service.addDocument({
      id: 'uuid-1',
      title: 'test',
      groupId: group.id!,
    });
    expect(document.id).toBeDefined();
    expect(document.title).toBe('test');
    expect(document.groupId).toBe(group.id!);
  });

  it('should list added document', async () => {
    const group = await service.addGroup({ name: 'test' });
    const document = await service.addDocument({
      id: 'uuid-1',
      title: 'test',
      groupId: group.id!,
    });
    const documents = await service.listDocuments(group.id!);
    expect(documents).toEqual([document]);
    expect(documents[0].group).toEqual(group);
  });

  it('should get document', async () => {
    const group = await service.addGroup({ name: 'test' });
    const document = await service.addDocument({
      id: 'uuid-1',
      title: 'test',
      groupId: group.id!,
    });
    const fetchedDocument = await service.getDocument(document.id!);
    expect(fetchedDocument).toEqual(document);
    expect(fetchedDocument.group).toEqual(group);
  });

  it('should throw 404 when getting non-existing document', async () => {
    try {
      await service.getDocument('uuid-1');
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);
    }
  });

  it('should update document', async () => {
    const group = await service.addGroup({ name: 'test' });
    const document = await service.addDocument({
      id: 'uuid-1',
      title: 'test',
      groupId: group.id!,
    });
    document.title = 'updated';
    const updatedDocument = await service.updateDocument(document);
    expect(updatedDocument).toEqual(document);
    expect(updatedDocument.group).toEqual(group);
  });

  it('should throw 404 when updating a non-existing document', async () => {
    // Create group to ensure that the error is due to the document not existing
    const group = await service.addGroup({ name: 'test' });

    try {
      await service.updateDocument({
        id: 'uuid-1',
        title: 'test',
        groupId: group.id!,
      });
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);
    }
  });

  it('should throw 404 when updating a document with non-existing groupId', async () => {
    // Create a group and a document
    const group = await service.addGroup({ name: 'test' });
    const document = await service.addDocument({
      id: 'uuid-1',
      title: 'test',
      groupId: group.id!,
    });

    // Set non-existing groupId
    document.groupId = 42;

    try {
      // Try to update the document with the non-existing groupId
      await service.updateDocument(document);
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);

      // Check that the document was not updated
      const updatedDocument = await service.getDocument(document.id);
      expect(updatedDocument.groupId).toBe(group.id!);
    }
  });

  it('should delete document', async () => {
    const group = await service.addGroup({ name: 'test' });
    const document = await service.addDocument({
      id: 'uuid-1',
      title: 'test',
      groupId: group.id!,
    });
    await service.deleteDocument(document.id!);
    try {
      await service.getDocument(document.id!);
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);
    }
  });

  it('should not throw an error when deleting non-existing document', async () => {
    await service.deleteDocument('uuid-1');
  });

  it('should delete all associated documents when deleting a group', async () => {
    // Add a group and a document associated with the group
    const group = await service.addGroup({ name: 'test' });
    const document = await service.addDocument({
      id: 'uuid-1',
      title: 'test',
      groupId: group.id!,
    });

    // Check that the document is associated with the group
    expect(await service.listDocuments(group.id!)).toEqual([document]);

    // Delete the group
    await service.deleteGroup(group.id!);

    // Check that the document was also deleted
    try {
      await service.getDocument(document.id!);
      fail('Expected an error');
    } catch (error) {
      const httpError = error as HttpErrorResponse;
      expect(httpError.name).toBe('HttpErrorResponse');
      expect(httpError.status).toBe(404);
    }
  });
});
