import { TestBed } from '@angular/core/testing';
import { Issues } from './issues';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';

describe('IssuesService', () => {
  let service: Issues;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideTanStackQuery(queryClient)],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(Issues);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', async () => {
    // console.log(service.labelsQuery.isLoading());
    const { data } = await service.labelsQuery.refetch();
    expect(data?.length).toBe(30);

    const [label] = data!;

    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
    expect(typeof label.id).toBe('number');
    expect(typeof label.name).toBe('string');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
  });

  it('should set selected state, OPEN, CLOSED, ALL', async () => {
    service.showIssuesByState('closed');
    expect(service.selectedState()).toBe('closed');

    const { data: closed } = await service.issuesQuery.refetch();
    closed?.forEach((issue) => {
      expect(issue.state).toBe('closed');
    });

    service.showIssuesByState('open');
    const { data: open } = await service.issuesQuery.refetch();
    open?.forEach((issue) => {
      expect(issue.state).toBe('open');
    });
  });

  it('should set selectedLabels', async () => {
    service.toggleLabels('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBeTrue();

    service.toggleLabels('Accessibility');
    expect(service.selectedLabels().has('Accessibility')).toBeFalse();
  });

  it('should set selectedLabels and get issues by label', async () => {
    const labelToTest = 'Accessibility';
    service.toggleLabels(labelToTest);
    const { data } = await service.issuesQuery.refetch();

    data?.forEach((issue) => {
      const hasLabel = issue.labels.some((l) => l.name === labelToTest);
      expect(hasLabel).toBeTrue();
    });
  });
});
