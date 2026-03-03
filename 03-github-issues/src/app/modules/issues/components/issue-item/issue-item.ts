import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubIssue } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { Issue } from '../../services/issue';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItem {
  issueService = inject(Issue);

  issue = input.required<GithubIssue>();

  get isOpen() {
    return this.issue().state === 'open';
  }

  prefetchData() {
    // this.issueService.prefetchIssue(this.issue().number);
    this.issueService.setIssueDate(this.issue());
  }
}
