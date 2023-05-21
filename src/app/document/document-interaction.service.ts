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
import { UploadDialogService } from '../shared/components/upload-dialog.component';
import { DocumentService, IDocumentInput } from './document.service';
import { Group } from '../group/group.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentInteractionService {
  constructor(
    protected _documentService: DocumentService,
    protected _uploadDialogService: UploadDialogService
  ) {}

  async onCreateDocument(
    group: Group,
    documentInput: IDocumentInput
  ): Promise<void> {
    const dialogRef = this._uploadDialogService.openUploadDialog(
      (file: File) => {
        return this._documentService.createDocument(
          group.id,
          documentInput,
          file
        );
      }
    );
    const uploadState = await firstValueFrom(dialogRef.afterClosed());
    if (uploadState && uploadState.state === 'done') {
      // TODO: get result from uploadState and emit interaction
    }
  }
}
