'use client'
import { getFirstPathSegment } from '@/app/lib/helpers'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// icon
import { Icon } from '@iconify/react/dist/iconify.js'
// components
import HomeSearch from '../search/HomeSearch'
// data
import cat_json from '../../data/category.json'

const navigation = cat_json.filter(i=> i.menu.visible === true);

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TuiNavbar({pageUrl}) {
    const path = usePathname();
    const category_slug = cat_json.find(i=> i.menu.href === getFirstPathSegment(path))?.menu?.href;
    return (
      <>
      <div className="bg-[#4C4C53] flex items-center justify-center py-[8px]">
        <div className="text-white mr-[10px]">
          Free shipping on orders over $99
        </div>
        <Icon icon="material-symbols-light:delivery-truck-speed" width="28" height="28"  className="text-white" />
      </div>
      <Disclosure as="nav" className="bg-white z-[9999]" >
            <div className="mx-auto container px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:border-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex items-center justify-center flex-1 sm:flex-initial sm:items-stretch sm:justify-start"> {/** flex-1 sm:items-stretch sm:justify-start */}
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="Bull Fireplace"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>
                    </div>
                    {/* <div className="hidden sm:block sm:w-[300px] md:w-[500px]">
                        <HomeSearch />
                    </div> */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* <ul className="flex space-x-4">
                            <li><a href="#home" className="text-gray-700 hover:text-blue-500 relative">
                                <div className="absolute bg-pallete-orange w-[20px] h-[20px] overflow-hidden rounded-full text-pallete-dark bottom-[60%] left-[60%] flex justify-center items-center">
                                    <div className="text-[10px]">26</div>
                                </div>
                                <Icon icon="bx:cart" width="24" height="24" /></a></li>
                            <li><a href="#about" className="text-gray-700 hover:text-blue-500 relative">

                                <div className="absolute bg-pallete-orange w-[20px] h-[20px] overflow-hidden rounded-full text-pallete-dark bottom-[60%] left-[60%] flex justify-center items-center">
                                    <div className="text-[10px]">739</div>
                                </div>
                                <Icon icon="bx:heart" width="24" height="24" />
                            </a></li>
                        </ul> */}
                        {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu> */}
                    </div>
                </div>
            </div>
            <div className="hidden sm:block mx-auto container px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center mt-[20px] sm:flex-wrap xl:justify-between">
                    <div className="flex sm:flex-wrap justify-center gap-y-4">
                        {
                            navigation.map((i, index) =>
                                <div key={`parent-nav-${index}`} className={`relative py-[5px] px-[15px] rounded-tl-md rounded-tr-md flex gap-[8px] items-center cursor-pointer border-b ${i.menu.href === category_slug ? 'text-white bg-pallete-orange' : 'text-pallete-dark'}`}>
                                    {/* <div className="text-white"><Icon icon={i.icon.name} /></div> */}
                                    <Link href={`/${i.menu.href}`} className={`${i.menu.href === category_slug ?"font-semibold":"font-normal"}`}>{i.name}</Link>
                                </div>
                            )
                        }
                    </div>
                    <div className="sm:flex sm:justify-center sm:w-full xl:w-auto sm:mt-4 xl:mt-0">
                        <div className="cursor-pointer font-semibold text-pallete-gray">
                            Free Shipping over $50
                        </div>
                    </div>
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={`/${item.menu.href}`}
                            aria-current={item.menu.href === category_slug ? 'page' : undefined}
                            className={classNames(
                                item.menu.href === category_slug ? 'bg-pallete-orange text-white' : 'text-gray-800 hover:bg-gray-600 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
      </>
    )
}
