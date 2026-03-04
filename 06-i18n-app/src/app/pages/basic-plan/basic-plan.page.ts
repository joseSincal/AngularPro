import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageSelector } from '../../components/language-selector/language-selector';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-basic-plan.page',
  imports: [LanguageSelector, RouterLink, TranslatePipe],
  templateUrl: './basic-plan.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPlanPage {}
