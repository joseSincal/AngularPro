import { Component, signal } from '@angular/core';

import { ApxSideMenu, TitleColor } from 'apx-side-menu';

@Component({
  selector: 'lib-app-root',
  imports: [ApxSideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('apx-testbed-app');

  TitleColor = TitleColor;

  isAuthenticated = signal(true);
}
