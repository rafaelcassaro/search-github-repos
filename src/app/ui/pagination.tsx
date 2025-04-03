'use client'

import { useSearchParams, } from "next/navigation";
import { generatePagination } from "../lib/utils";
import clsx from "clsx";

export default function Pagination({ totalRepos, perPage, }:
    { totalRepos: number, perPage: number }) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    //isolar calculo de totalPages
    let totalPages = totalRepos / perPage;

    if (!Number.isInteger(totalPages)) {
        totalPages = totalPages + 1;
    }

    const totalPagesArray = generatePagination(totalPages);

    function handleButtonn(pageNumber: number) {
        const urlSearchParams = new URLSearchParams(searchParams.toString())
        urlSearchParams.set('page', pageNumber.toString());
        window.history.pushState(null, '', `?${urlSearchParams.toString()}`);
    }

    return (
        <>
            {totalPagesArray.map((number) => (
                <button key={number} onClick={() => handleButtonn(number)}
                    className={clsx(
                        'text-text-white font-bold text-base cursor-pointer p-1 border border-github-border w-7 h-7 flex justify-center rounded-sm',
                        {
                            'z-10 bg-blue-600 border-blue-600 text-white': number === currentPage

                        },)}>
                    {number}
                </button>

            ))}
        </>
    )
}