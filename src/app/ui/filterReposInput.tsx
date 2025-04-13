'use client'

import { useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";


export default function FilterReposInput() {
    const searchParams = useSearchParams();

    const handleInput = useDebouncedCallback((e: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('search', e.toLowerCase());
        params.set('page', '1');
        window.history.pushState(null, '', `?${params.toString()}`);
    }, 300);

    return (
        <div>
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                Procurar
            </label>
            <input
                className={'text-lg p-1 border-github-border border-solid border rounded-2xl px-4 py-2 placeholder-github-grey'}
                type={'text'}
                placeholder={"procure um repositório"}
                onChange={(e) => handleInput(e.target.value)}
            />
        </div>
    )
}