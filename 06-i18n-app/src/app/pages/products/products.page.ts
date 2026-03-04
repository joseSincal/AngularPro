import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageSelector } from '../../components/language-selector/language-selector';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products.page',
  imports: [RouterLink, LanguageSelector, TranslatePipe],
  templateUrl: './products.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsPage {
  fullName = signal('José Sincal');
}
