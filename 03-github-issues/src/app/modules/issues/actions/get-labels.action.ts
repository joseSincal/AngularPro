import { GithubLabel } from '../interfaces';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getLabels = async (): Promise<GithubLabel[]> => {
  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load labels";

    const labels: GithubLabel[] = await resp.json();
    // console.log({ labels });
    return labels;
  } catch (error) {
    console.error(error);
    throw "Can't load labels";
  }
};
