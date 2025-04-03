import { reposApi } from "./api";

export const generatePagination = ( totalPages: number) => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
};


export function changeTable(perPage: number, allRepositories: reposApi[], currentPage: number) {
    if (!allRepositories?.length) {
        return 0;
    }
    const indexOfLastRepo = currentPage * perPage;
    const indexOfFirstRepo = indexOfLastRepo - perPage;
    return allRepositories.slice(indexOfFirstRepo, indexOfLastRepo);
}


export function sortRepositories(sortParam: string | null, orderParam: string | null, allRepositories: reposApi[] |null) {
    if (!allRepositories?.length) {
        return null;
    }

    if (orderParam === 'des') {
        if (sortParam === 'star') {
            return allRepositories.sort((a, b) => a.stargazers_count - b.stargazers_count);
        } else if (sortParam === 'forks') {
            return allRepositories.sort((a, b) => a.forks - b.forks);
        } else if (sortParam === 'nome') {
            return allRepositories.sort((a, b) => b.name.localeCompare(a.name));
        }
    }
    else {
        if (sortParam === 'star') {
            return allRepositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
        } else if (sortParam === 'forks') {
            return allRepositories.sort((a, b) => b.forks - a.forks);
        } else if (sortParam === 'nome') {
            return allRepositories.sort((a, b) => a.name.localeCompare(b.name));
        }
    }
}