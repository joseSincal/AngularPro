import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgStyle } from '@angular/common';

import { GithubLabel } from '../../interfaces';
import { Issues } from '../../services/issues';

@Component({
  selector: 'issues-labels-selector',
  imports: [NgStyle],
  templateUrl: './labels-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsSelector {
  issuesService = inject(Issues);
  labels = input.required<GithubLabel[]>();

  isSelected(labelName: string) {
    return this.issuesService.selectedLabels().has(labelName);
  }

  onToggleLabel(labelName: string) {
    this.issuesService.toggleLabels(labelName);
  }
}
