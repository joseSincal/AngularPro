import { sleep } from '@helpers';
import { GithubIssue } from '../interfaces';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssues = async (
  state: 'open' | 'closed' | 'all' = 'all',
  selectedLabels: string[] = [],
): Promise<GithubIssue[]> => {
  // await sleep(1500);

  const params = new URLSearchParams();
  params.append('state', state);

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const resp = await fetch(`${BASE_URL}/issues?${params}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load issues";

    const issues: GithubIssue[] = await resp.json();
    // console.log({ issues });
    return issues;
  } catch (error) {
    console.error(error);
    throw "Can't load issues";
  }
};
