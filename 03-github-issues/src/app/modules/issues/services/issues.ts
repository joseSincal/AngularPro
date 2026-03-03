import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssues, getLabels } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class Issues {
  selectedState = signal<'open' | 'closed' | 'all'>('all');
  selectedLabels = signal(new Set<string>());

  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  public issuesQuery = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this.selectedState(),
        labels: [...this.selectedLabels()].sort((a, b) => a.localeCompare(b)),
      },
    ],
    queryFn: () => getIssues(this.selectedState(), [...this.selectedLabels()].sort((a, b) => a.localeCompare(b))),
  }));

  showIssuesByState(state: 'open' | 'closed' | 'all') {
    this.selectedState.set(state);
  }

  toggleLabels(label: string) {
    const labels = this.selectedLabels();

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this.selectedLabels.set(new Set(labels));
  }
}
