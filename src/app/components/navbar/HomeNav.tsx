'use client'
import HomeSearch from "../search/HomeSearch";
import { Icon } from '@iconify/react';
import { useState } from "react";
const HomeNav = () => {
    const menu = [
        {
            isActive: true,
            featured: true,
            label: "All Categories",
            icon: {
                name: "game-icons:hamburger-menu",
                position: "left",
            },
            expand_trigger: "hover", // click or hover
            child: [
                { featured: true, label: "Featured Category 1", url: "#" },
                { featured: true, label: "Featured Category 2", url: "#" },
                { featured: true, label: "Featured Category 3", url: "#" },
                {
                    featured: false, label: "Fireplace Category 1", url: "#", child: [
                        {
                            label: "FireplateCat1 Category1",
                            items: [
                                { label: "FC1C1 Item1", url: "#" },
                                { label: "FC1C1 Item2", url: "#" },
                                { label: "FC1C1 Item3", url: "#" },
                                { label: "FC1C1 Item4", url: "#" },
                                { label: "FC1C1 Item5", url: "#" },
                                { label: "FC1C1 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category2",
                            items: [
                                { label: "FC1C2 Item1", url: "#" },
                                { label: "FC1C2 Item2", url: "#" },
                                { label: "FC1C2 Item3", url: "#" },
                                { label: "FC1C2 Item4", url: "#" },
                                { label: "FC1C2 Item5", url: "#" },
                                { label: "FC1C2 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category3",
                            items: [
                                { label: "FC1C3 Item1", url: "#" },
                                { label: "FC1C3 Item2", url: "#" },
                                { label: "FC1C3 Item3", url: "#" },
                                { label: "FC1C3 Item4", url: "#" },
                                { label: "FC1C3 Item5", url: "#" },
                                { label: "FC1C3 Item6", url: "#" },
                            ]
                        }
                    ]
                },
                {
                    featured: false, label: "Fireplace Category 2", url: "#", child: [
                        {
                            label: "FireplateCat1 Category1",
                            items: [
                                { label: "FC2C1 Item1", url: "#" },
                                { label: "FC2C1 Item2", url: "#" },
                                { label: "FC2C1 Item3", url: "#" },
                                { label: "FC2C1 Item4", url: "#" },
                                { label: "FC2C1 Item5", url: "#" },
                                { label: "FC2C1 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category2",
                            items: [
                                { label: "FC2C2 Item1", url: "#" },
                                { label: "FC2C2 Item2", url: "#" },
                                { label: "FC2C2 Item3", url: "#" },
                                { label: "FC2C2 Item4", url: "#" },
                                { label: "FC2C2 Item5", url: "#" },
                                { label: "FC2C2 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category3",
                            items: [
                                { label: "FC2C3 Item1", url: "#" },
                                { label: "FC2C3 Item2", url: "#" },
                                { label: "FC2C3 Item3", url: "#" },
                                { label: "FC2C3 Item4", url: "#" },
                                { label: "FC2C3 Item5", url: "#" },
                                { label: "FC2C3 Item6", url: "#" },
                            ]
                        }
                    ]
                }, ,
                {
                    featured: false, label: "Fireplace Category 3", url: "#", child: [
                        {
                            label: "FireplateCat3 Category1",
                            items: [
                                { label: "FC3C1 Item1", url: "#" },
                                { label: "FC3C1 Item2", url: "#" },
                                { label: "FC3C1 Item3", url: "#" },
                                { label: "FC3C1 Item4", url: "#" },
                                { label: "FC3C1 Item5", url: "#" },
                                { label: "FC3C1 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category2",
                            items: [
                                { label: "FC3C2 Item1", url: "#" },
                                { label: "FC3C2 Item2", url: "#" },
                                { label: "FC3C2 Item3", url: "#" },
                                { label: "FC3C2 Item4", url: "#" },
                                { label: "FC3C2 Item5", url: "#" },
                                { label: "FC3C2 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category3",
                            items: [
                                { label: "FC3C3 Item1", url: "#" },
                                { label: "FC3C3 Item2", url: "#" },
                                { label: "FC3C3 Item3", url: "#" },
                                { label: "FC3C3 Item4", url: "#" },
                                { label: "FC3C3 Item5", url: "#" },
                                { label: "FC3C3 Item6", url: "#" },
                            ]
                        }
                    ]
                },
            ],

        },
        {
            isActive: false,
            featured: true,
            label: "Promotion 1",
            icon: {
                name: "game-icons:hamburger-menu",
                position: "left",
            },
            expand_trigger: "hover", // click or hover
            child: [
                { featured: true, label: "Featured Category 1", url: "#" },
                { featured: true, label: "Featured Category 2", url: "#" },
                { featured: true, label: "Featured Category 3", url: "#" },
                {
                    featured: false, label: "Fireplace Category 1", url: "#", child: [
                        {
                            label: "FireplateCat1 Category1",
                            items: [
                                { label: "FC1C1 Item1", url: "#" },
                                { label: "FC1C1 Item2", url: "#" },
                                { label: "FC1C1 Item3", url: "#" },
                                { label: "FC1C1 Item4", url: "#" },
                                { label: "FC1C1 Item5", url: "#" },
                                { label: "FC1C1 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category2",
                            items: [
                                { label: "FC1C2 Item1", url: "#" },
                                { label: "FC1C2 Item2", url: "#" },
                                { label: "FC1C2 Item3", url: "#" },
                                { label: "FC1C2 Item4", url: "#" },
                                { label: "FC1C2 Item5", url: "#" },
                                { label: "FC1C2 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category3",
                            items: [
                                { label: "FC1C3 Item1", url: "#" },
                                { label: "FC1C3 Item2", url: "#" },
                                { label: "FC1C3 Item3", url: "#" },
                                { label: "FC1C3 Item4", url: "#" },
                                { label: "FC1C3 Item5", url: "#" },
                                { label: "FC1C3 Item6", url: "#" },
                            ]
                        }
                    ]
                },
                {
                    featured: false, label: "Fireplace Category 2", url: "#", child: [
                        {
                            label: "FireplateCat1 Category1",
                            items: [
                                { label: "FC2C1 Item1", url: "#" },
                                { label: "FC2C1 Item2", url: "#" },
                                { label: "FC2C1 Item3", url: "#" },
                                { label: "FC2C1 Item4", url: "#" },
                                { label: "FC2C1 Item5", url: "#" },
                                { label: "FC2C1 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category2",
                            items: [
                                { label: "FC2C2 Item1", url: "#" },
                                { label: "FC2C2 Item2", url: "#" },
                                { label: "FC2C2 Item3", url: "#" },
                                { label: "FC2C2 Item4", url: "#" },
                                { label: "FC2C2 Item5", url: "#" },
                                { label: "FC2C2 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category3",
                            items: [
                                { label: "FC2C3 Item1", url: "#" },
                                { label: "FC2C3 Item2", url: "#" },
                                { label: "FC2C3 Item3", url: "#" },
                                { label: "FC2C3 Item4", url: "#" },
                                { label: "FC2C3 Item5", url: "#" },
                                { label: "FC2C3 Item6", url: "#" },
                            ]
                        }
                    ]
                }, ,
                {
                    featured: false, label: "Fireplace Category 3", url: "#", child: [
                        {
                            label: "FireplateCat3 Category1",
                            items: [
                                { label: "FC3C1 Item1", url: "#" },
                                { label: "FC3C1 Item2", url: "#" },
                                { label: "FC3C1 Item3", url: "#" },
                                { label: "FC3C1 Item4", url: "#" },
                                { label: "FC3C1 Item5", url: "#" },
                                { label: "FC3C1 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category2",
                            items: [
                                { label: "FC3C2 Item1", url: "#" },
                                { label: "FC3C2 Item2", url: "#" },
                                { label: "FC3C2 Item3", url: "#" },
                                { label: "FC3C2 Item4", url: "#" },
                                { label: "FC3C2 Item5", url: "#" },
                                { label: "FC3C2 Item6", url: "#" },
                            ]
                        },
                        {
                            label: "FireplateCat1 Category3",
                            items: [
                                { label: "FC3C3 Item1", url: "#" },
                                { label: "FC3C3 Item2", url: "#" },
                                { label: "FC3C3 Item3", url: "#" },
                                { label: "FC3C3 Item4", url: "#" },
                                { label: "FC3C3 Item5", url: "#" },
                                { label: "FC3C3 Item6", url: "#" },
                            ]
                        }
                    ]
                },
            ],

        }
    ];

    const [selectedParent, setSelectedParent] = useState("All Categories");
    const [selectedChild, setSelectedChild] = useState("Fireplace Category 1");

    // const [selectedParentNav, setSelectedParentNav] = useState([])

    return <header className="sticky top-0 z-50 shadow-md bg-white">
        <nav className="container mx-auto bg-white">
            <div className="flex justify-between items-center pt-4 px-4">
                <a href="/" className="text-xl font-bold">Brand</a>
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
                    <div className="relative text-white bg-pallete-orange py-[5px] px-[15px] rounded-tl-md rounded-tr-md flex gap-[8px] items-center">
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
                    {/* {
                        menu.map((i, index) =>
                            <div key={`parent-nav-${index}`} className={`relative py-[5px] px-[15px] rounded-tl-md rounded-tr-md flex gap-[8px] items-center ${i.isActive ? 'text-white bg-pallete-orange' : 'bg-white text-pallete-dark'}`}>
                                <div className="text-white"><Icon icon={i.icon.name} /></div>
                                <div className="font-bold">{i.label}</div>
                            </div>
                        )
                    } */}
                </div>
                <div>
                    Free Shipping over $50
                </div>
            </div>
        </nav>

        {/* <nav className="container mx-auto">
            {
                menu.filter(i => i.label === selectedParent).length > 0 &&
                <div className="p-[5px] flex">
                    <div className="p-[5px] border-r">
                        <ul>
                            {
                                menu.filter(i1 => i1.label === selectedParent)[0]["child"].map((i1, index) =>
                                    <li key={`sub-nav-${index}`} className={`py-[10px] ${menu.filter(i1 => i1.label === selectedParent)[0]["child"].length - 1 === index ? '' : 'border-b'} `}>
                                        <a href={i1?.featured ? i1?.url : '#'} className={`text-black text-[18px] flex items-center justify-between gap-[20px] ${i1?.featured ? 'font-semibold' : ''}`}>
                                            <div>
                                                {i1?.label}
                                            </div>
                                            {
                                                !i1?.featured && <Icon icon="solar:alt-arrow-right-line-duotone" className="text-pallete-gray" />
                                            }
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                        <div className="p-[5px] flex flex-col flex-wrap">
                            {
                                menu.filter(i => i.label === selectedParent)[0]["child"].filter(i1=> i1?.label === selectedChild)[0]?.child.map((i2,index)=>
                                    <div key={`cat-item-group-${index}`}>
                                        <div>{i2.label}</div>
                                        <div>
                                            <ul key={`cat-item-group-ul-${index}`}>
                                                {
                                                    i2.items.map((i,index2)=>
                                                        <li className="py-[8px]">
                                                            <a href={i.url}>{i.label}</a>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                </div>
            }
        </nav> */}
    </header>

}

export default HomeNav;