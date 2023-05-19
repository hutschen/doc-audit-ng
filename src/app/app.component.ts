import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <div>
      <app-group-list></app-group-list>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
