import { sleep } from '@helpers';
import { GithubIssue } from '../interfaces';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueCommentsByNumber = async (issueNumber: number): Promise<GithubIssue[]> => {
  // await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load comments";

    const comments: GithubIssue[] = await resp.json();
    // console.log({ comments });
    return comments;
  } catch (error) {
    console.error(error);
    throw `Can't load comments by issue ${issueNumber}`;
  }
};
