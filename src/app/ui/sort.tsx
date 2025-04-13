'use client'

import { useSearchParams } from "next/navigation";
import { HiArrowsUpDown } from "react-icons/hi2";


export default function SortBy() {
    const searchParamsList = ["nome", "star", "forks"]
    const searchParams = useSearchParams();

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        urlSearchParams.set('sortBy', value);
        urlSearchParams.set('page', '1');
        window.history.pushState(null, '', `?${urlSearchParams.toString()}`);
    }

    function handlebutton() {
        const urlSearchParams = new URLSearchParams(searchParams.toString());
        const orderParam = urlSearchParams.get('order');
        urlSearchParams.set('page', '1');
        if (orderParam === 'asc') {
            urlSearchParams.set('order', 'des');
            window.history.pushState(null, '', `?${urlSearchParams.toString()}`);
        } else if (orderParam === 'des') {
            urlSearchParams.set('order', 'asc');
            window.history.pushState(null, '', `?${urlSearchParams.toString()}`);
        } 
        //retirar esse else talves
        else {
            urlSearchParams.set('order', 'des');
            window.history.pushState(null, '', `?${urlSearchParams.toString()}`);
        }
    }


    return (
        <div className="flex gap-5 mb-4 w-fit">
            <div>
                <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                    Organizar
                </label>
                <div className="flex gap-6">
                    <select
                        id="customer"
                        name="customerId"
                        className="peer block w-full cursor-pointer text-lg p-1 border-github-border bg-github-border border-solid border rounded-2xl px-4 py-2 placeholder-github-grey"
                        defaultValue=""
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        {searchParamsList.map((customer) => (
                            <option key={customer} value={customer}>
                                {customer}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                    Ordenar
                </label>
                <button className="cursor-pointer" onClick={handlebutton}>
                    <HiArrowsUpDown size={40} />
                </button>
            </div>
        </div>
    )
}