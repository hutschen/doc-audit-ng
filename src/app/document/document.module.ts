import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListComponent } from './document-list.component';
import { MaterialModule } from '../material/material.module';
import { CreateDocumentComponent } from './create-document.component';

@NgModule({
  declarations: [DocumentListComponent, CreateDocumentComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DocumentListComponent],
})
export class DocumentModule {}
