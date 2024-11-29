import { Icon } from '@iconify/react';
const HomeSearch = () => {
    return <div className="flex w-full">
        <input type="search" placeholder="Search..." className="w-full text-sm font-normal px-[20px] py-[10px] border border-orange-400 rounded-tl-full rounded-bl-full" />
        <button className="rounded-tr-full rounded-br-full bg-pallete-orange text-white font-normal text-sm px-[20px] py-[10px]">
            <Icon icon="iconamoon:search-bold"  className="text-lg"/>
        </button>
    </div>
}

export default HomeSearch;  