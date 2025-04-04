'use client'

import { use } from "react";
import Pagination from "./pagination";
import { useSearchParams} from "next/navigation";
import { changeTable, sortRepositories } from "../lib/utils";
import { reposApi } from "../lib/api";
import { FaFolder, FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";


export default function Table({ repositoriesData }:
    { repositoriesData: Promise<reposApi[] | null> }) {

    const allRepositoriesApi = use(repositoriesData);
    const searchParams = useSearchParams();
    if (!Array.isArray(allRepositoriesApi) || allRepositoriesApi.length === 0) {
        return (
            <div>Nenhum usuário encontrado.</div>
        )
    }

    
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    const perPage = 10;
    const currentPage = Number(searchParams.get('page')) || 1;

    const sortParam = urlSearchParams.get('sortBy');
    const orderParam = urlSearchParams.get('order');
    const searchParam = urlSearchParams.get('search');

    let tableRepositories = allRepositoriesApi;
    let reposLength = 0;

    if (searchParam !== null) {
        const filteredRepos = allRepositoriesApi.filter((item) => item.name.toLowerCase().includes(searchParam));
        reposLength = filteredRepos.length;
        sortRepositories(sortParam, orderParam, filteredRepos);
        tableRepositories = changeTable(perPage, filteredRepos, currentPage);
    }
    else {
        reposLength = allRepositoriesApi?.length;
        sortRepositories(sortParam, orderParam, allRepositoriesApi);
        tableRepositories = changeTable(perPage, allRepositoriesApi, currentPage);
    }

    return (
        <>
            <section className="overflow-hidden">
                <table className="w-full mx-auto table-fixed text-left ">
                    <tbody className="">
                        {tableRepositories.length > 0 ? (
                            tableRepositories.map((repos: reposApi) => (
                                <tr key={repos.name} className="border border-solid border-github-border justify-items-center">
                                    <td className="p-2 ">
                                        <div className="gap-2 flex self-center">
                                            <FaFolder  className=""/>
                                            <div>{repos.name}</div>
                                        </div>
                                    </td>
                                    <td className="p-2 ">
                                        <div className="gap-2 flex ">
                                            <FaStar />
                                            <div>{repos.stargazers_count}</div>
                                        </div>
                                    </td>
                                    <td className="p-2 ">
                                        <div className="gap-2 flex">
                                            <FaCodeFork />
                                            <div>{repos.forks}</div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>Nenhum repositório encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            <div className="flex justify-end gap-3 my-3 ">
                {tableRepositories.length > 0 ? (
                    <Pagination totalRepos={reposLength} perPage={perPage} />
                ) : (
                    <Pagination totalRepos={1} perPage={perPage} />
                )}
            </div>
        </>
    )
}