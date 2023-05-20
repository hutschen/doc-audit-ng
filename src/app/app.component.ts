import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <mat-drawer-container class="drawer-container" autosize>
      <mat-drawer class="drawer" #drawer mode="side" opened>
        <app-group-list></app-group-list>
      </mat-drawer>

      <div class="content">
        <button type="button" mat-button (click)="drawer.toggle()">
          Toggle sidenav
        </button>
        <router-outlet></router-outlet>
      </div>
    </mat-drawer-container>
  `,
  styles: [
    `
      .drawer-container {
        width: 100vw;
        height: calc(100vh - 64px); // 64px is the height of the toolbar
      }

      .drawer {
        width: 260px;
      }
    `,
  ],
})
export class AppComponent {}
