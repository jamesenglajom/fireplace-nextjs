import HomeSearch from "../search/HomeSearch";
import { Icon } from '@iconify/react';
const HomeNav = () => {
    return <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto">
            <div className="flex justify-between items-center pt-4 px-4">
                <a href="#" className="text-xl font-bold">Brand</a>
                <div className="text-xl font-bold min-w-[500px]">
                    <HomeSearch />
                </div>
                <ul className="flex space-x-4">
                    <li><a href="#home" className="text-gray-700 hover:text-blue-500">Cart</a></li>
                    <li><a href="#about" className="text-gray-700 hover:text-blue-500">Heart</a></li>
                </ul>
            </div>
            <div className="flex items-center justify-between mt-[20px]">
                <div className="flex">
                <div className="text-white bg-pallete-orange py-[5px] px-[15px] rounded-tl-md rounded-tr-md flex gap-[8px] items-center">
                    <div><Icon icon="game-icons:hamburger-menu" /></div>
                    <div className="font-bold">All Categories</div>
                </div>
                <div className="text-white bg-white py-[5px] px-[15px] rounded-tl-md rounded-tr-md flex gap-[8px] items-center">
                    <div><Icon icon="game-icons:hamburger-menu" /></div>
                    <div className="font-bold text-slate-800">Promotion 1</div>
                </div>
                <div className="text-white bg-white py-[5px] px-[15px] rounded-tl-md rounded-tr-md flex gap-[8px] items-center">
                    <div><Icon icon="game-icons:hamburger-menu" /></div>
                    <div className="font-bold text-slate-800">Promotion 2</div>
                </div>
                <div className="text-white bg-white py-[5px] px-[15px] rounded-tl-md rounded-tr-md flex gap-[8px] items-center">
                    <div><Icon icon="game-icons:hamburger-menu" /></div>
                    <div className="font-bold text-slate-800">Promotion 3</div>
                </div>
                <div className="text-white bg-white py-[5px] px-[15px] rounded-tl-md rounded-tr-md flex gap-[8px] items-center">
                    <div><Icon icon="game-icons:hamburger-menu" /></div>
                    <div className="font-bold text-slate-800">Promotion 4</div>
                </div>
                </div>
                <div>
                    Free Shipping over $50
                </div>
            </div>
        </nav>
    </header>

}

export default HomeNav;