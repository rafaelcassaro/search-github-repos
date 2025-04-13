'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";

export default function SearchUser() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    
    const handleSearch = useDebouncedCallback((e: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.delete('order');
        params.delete('sortBy');
        params.delete('search');
        if (e) {
            params.set('user', e.toLowerCase());
        } else {
            params.delete('user');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div className="flex justify-center placeholder-github-grey" >
            <input
                className="text-lg p-1 border-github-border border-solid border rounded-2xl px-4 py-2 placeholder-github-grey"
                placeholder='Digite um usuario'
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('user')?.toString()}
            />
        </div>
    )
}