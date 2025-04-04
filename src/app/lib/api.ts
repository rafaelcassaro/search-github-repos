export interface reposApi {
    name: string;
    stargazers_count: number;
    forks:number;
}

export const getRepos = async (username: string) : Promise<reposApi[] | null> => {
    if (!username) {
        return null;
    }
    console.log('getRepos from api...');
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);

    if (!response.ok) {
        return null;
    }

    const repos: reposApi[] = await response.json();
    return repos;
}