import { Component, effect, inject, input } from '@angular/core';
import { Issue } from '../../services/issue';
import { RouterLink } from '@angular/router';
import { IssueComment } from "../../components/issue-comment/issue-comment";

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink, IssueComment],
  templateUrl: './issue-page.html',
})
export default class IssuePage {
  issueService = inject(Issue);

  issueNumber = input.required<number>();
  issueQuery = this.issueService.issueQuery;
  issueCommentsQuery = this.issueService.issueCommentsQuery;

  constructor() {
    effect(() => this.issueService.setIssueNumber(this.issueNumber()));
  }
}
