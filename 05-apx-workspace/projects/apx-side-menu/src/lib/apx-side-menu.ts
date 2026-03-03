import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export enum TitleColor {
  red = 'text-red-500',
  green = 'text-green-500',
  blue = 'text-blue-500',
  purple = 'text-purple-500',
}


@Component({
  selector: 'lib-apx-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './apx-side-menu.html',
  styles: ``,
})
export class ApxSideMenu {
  isAuthenticated = input<boolean>(false);

  title = input<string>('APX');
  subTitle = input<string>('Corp');

  titleColor = input<TitleColor>(TitleColor.blue);

  signOut = output<void>();
  signIn = output<void>();
}
