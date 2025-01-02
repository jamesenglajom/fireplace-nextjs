'use client'
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import cat_json from "../../data/category.json";
import useFetchProducts from '@/app/hooks/useFetchProducts';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;
const HomeSearch = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState("fireplacess");
    const [recentResults, setRecentResults] = useState([]);
    const [categoryResults, setCategoryResults] = useState([]);
    const [productResults, setProrductResults] = useState([]);
    const [linksResults, setLinkResults] = useState([]);
    const { products, loading, pagination, refetch } = useFetchProducts({ keyword: search });

    useEffect(() => {
        refetch({ keyword: search })
    }, [search]);

    useEffect(() => {
        setProrductResults(products)
    }, [products]);

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        getSearchResults(value);
    }

    const getSearchResults = (query) => {
        const categories = cat_json.filter(i => i.searchable === true)
            .filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
            .map(i => ({ name: i.name, url: i.menu.href }));
        console.log("categories", categories)
        setCategoryResults(categories);
    }

    return <div className="flex w-full">
        <input type="search" placeholder="Search..." className="w-full text-sm font-normal px-[20px] py-[10px] border border-orange-400 rounded-tl-full rounded-bl-full" onClick={() => setOpenSearch(true)} />
        <button className="rounded-tr-full rounded-br-full bg-pallete-orange text-white font-normal text-sm px-[20px] py-[10px]" onClick={() => setOpenSearch(true)}>
            <Icon icon="iconamoon:search-bold" className="text-lg" />
        </button>

        <Dialog open={openSearch} onClose={setOpenSearch} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="">
                            <div className="flex items-center p-2">
                                <Icon icon="pajamas:search" width="25" height="25" className="text-stone-500 mr-2" />
                                <input value={search} onInput={handleSearch} type="text" placeholder="Search" className="w-full text-stone-500 font-light outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                <button className="ml-2 text-[10px] border rounded-md p-[4px] border-stone-300 hover:border-stone-400">ESC</button>
                            </div>
                            {/* <div className="h-[250px] flex items-center justify-center">
                                <div className="text-stone-500">No Recent Searches</div>
                            </div> */}
                            <div className="h-[250px] flex flex-col gap-[10px] py-4 overflow-y-auto border-t p-2">
                                {
                                    search === "" && recentResults.length > 0 && <div>
                                        <div className="text-[10px] font-bold text-stone-500">Recents</div>
                                        <div className="py-1">
                                            <div className="hover:bg-stone-200 px-2">
                                                <div className="text-[14px]">Tests</div>
                                                <div className="text-[10px] text-gray-500 font-normal">Tests &gt; Test</div>
                                            </div>
                                            <div className="hover:bg-stone-200 px-2">
                                                <div className="text-[14px]">Tests2</div>
                                                <div className="text-[10px] text-gray-500 font-normal">Tests2 &gt; Tests2</div>
                                            </div>
                                            <div className="hover:bg-stone-200 px-2">
                                                <div className="text-[14px]">Tests3</div>
                                                <div className="text-[10px] text-gray-500 font-normal">Tests3 &gt; Tests3</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    categoryResults.length > 0 && (<div>
                                        <div className="text-[10px] font-bold text-stone-500">Categories</div>
                                        <div className="py-1">
                                            {
                                                categoryResults.map(i => (
                                                    <Link key={`cat-result-${i.url}`} href={`${BASE_URL}/${i.url}`}>
                                                        <div className="group hover:bg-stone-200 px-2 py-[5px]">
                                                            <div className="text-[14px] group-hover:text-orange-600">{i.name}</div>
                                                            <div className="text-[10px] text-gray-500 font-normal">Category &bull; {i.url}</div>
                                                        </div>
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>)
                                }
                                {
                                    productResults.length > 0 && <div>
                                        <div className="text-[10px] font-bold text-stone-500">Products</div>
                                        <div className="py-1">
                                            {
                                                productResults.map(i =>
                                                    <Link href={`${BASE_URL}/product/${i.id}`}>
                                                        <div className="group hover:bg-stone-200 px-2 py-[5px]">
                                                            <div className="text-[14px] group-hover:text-orange-600">{i.name}</div>
                                                            <div className="text-[10px] text-gray-500 font-normal">Product &bull; {i.name}</div>
                                                        </div>
                                                    </Link>)
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </div>
}

export default HomeSearch;  