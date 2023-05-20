import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListComponent } from './document-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [DocumentListComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DocumentListComponent],
})
export class DocumentModule {}
