import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <div class="fx-row">
      <div class="fx-flex-30">
        <app-group-list></app-group-list>
      </div>
      <div class="fx-grow">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['shared/styles/flex.scss'],
  styles: [],
})
export class AppComponent {}
