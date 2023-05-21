import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListComponent } from './document-list.component';
import { MaterialModule } from '../material/material.module';
import { CreateDocumentComponent } from './create-document.component';
import { DocumentDialogComponent } from './document-dialog.component';

@NgModule({
  declarations: [DocumentListComponent, CreateDocumentComponent, DocumentDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DocumentListComponent],
})
export class DocumentModule {}
