import { NgModule, Query } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListComponent } from './document-list.component';
import { MaterialModule } from '../material/material.module';
import { CreateDocumentComponent } from './create-document.component';
import { DocumentDialogComponent } from './document-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { QueryModule } from '../query/query.module';

@NgModule({
  declarations: [
    CreateDocumentComponent,
    DocumentDialogComponent,
    DocumentListComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule, QueryModule],
  exports: [DocumentListComponent],
})
export class DocumentModule {}
