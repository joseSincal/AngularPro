import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';
import { GithubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Issue {
  private readonly issueNumber = signal<number | null>(null);
  private readonly queryClient = inject(QueryClient);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', Number(this.issueNumber())],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  }));

  public issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', Number(this.issueNumber()), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(issueNumber: number) {
    this.issueNumber.set(issueNumber);
  }

  prefetchIssue(issueNumber: number) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', Number(issueNumber)],
      queryFn: () => getIssueByNumber(issueNumber),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  }

  setIssueDate(issue: GithubIssue) {
    this.queryClient.setQueryData(['issue', Number(issue.number)], issue, {
      updatedAt: Date.now() + 1000 * 60 * 5, // 5 minutes
    });
  }
}
