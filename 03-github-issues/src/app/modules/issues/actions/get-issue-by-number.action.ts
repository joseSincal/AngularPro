import { GithubIssue } from '../interfaces';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueByNumber = async (issueNumber: number): Promise<GithubIssue> => {
  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load issue";

    const issue: GithubIssue = await resp.json();
    return issue;
  } catch (error) {
    console.error(error);
    throw `Can't load issue ${issueNumber}`;
  }
};
