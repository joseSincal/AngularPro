import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GithubIssue } from '../../interfaces';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  templateUrl: './issue-comment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComment {
  issue = input.required<GithubIssue>();
}
