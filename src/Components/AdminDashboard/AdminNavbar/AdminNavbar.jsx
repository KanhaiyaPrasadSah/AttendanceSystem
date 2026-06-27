"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Overview from '../components/Overview';

export default function AdminNavbar() {
    const [search, setSearch] = useState("");
    const [NotificationDetails, setNotificationDetails] = useState(null);
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);
    const[showProfile, setShowProfile] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        if (search.trim() == Pages || search.trim() === pages) {
            setSearch("Pages");
            router.push(`/AdminDashboard/${search}`);
        }
        router.push(`/AdminDashboard/${search}`);
    };
    const NotificationOnClick = async (e) => {
        e.preventDefault();
        setShowNotification((prev) => !prev);
        if (!NotificationDetails) {
            try {
                const res = await axios.get("https://api.slingacademy.com/v1/sample-data/photos?limit=5");
                console.log(res.data);
                setNotificationDetails(res.data.photos);
            } catch (error) {
                console.error(error);
                 
            }
        }

    };
    const OnProfileClick = async(e) => {
        e.preventDefault();
        setShowProfile((prev) => !prev);
    }
    return (
        <div>
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Control Panel Dashboard
                        </span>

                        <form onSubmit={handleSearch} className="hidden md:block md:pl-2">
                            <label htmlFor="topbar-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative md:w-64 md:w-96">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="textarea"
                                    placeholder="Search"
                                    value={search} onChange={e => setSearch(e.target.value)}

                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

                                />
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center lg:order-2">

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={NotificationOnClick}
                                type="button"
                                className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100"
                            >
                                {/* Bell icon */}
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                            </button>

                            {showNotification && NotificationDetails && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col">
                                    <div className="px-4 py-3 border-b">
                                        <h2 className="font-semibold text-lg">
                                            Notifications
                                        </h2>
                                    </div>

                                    {/* Notification List */}
                                    <div className="max-h-96 overflow-y-auto">

                                        {NotificationDetails.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b transition"
                                            >
                                                {/* Image */}
                                                <img
                                                    src={item.url}
                                                    alt={item.title}
                                                    className="w-14 h-14 rounded-lg object-cover"
                                                />

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-800 text-sm">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                        {item.description}
                                                    </p>

                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-500 text-xs hover:underline mt-1 inline-block"
                                                    >
                                                        View Image
                                                    </a>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Apps */}
                         {/* <button
                            type="button"
                            data-dropdown-toggle="apps-dropdown"
                            className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">View notifications</span>  */}
                            {/* Icon */}
                             {/* <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>  */}
                        {/* </button> */}
                        
                        {/* Dropdown menu */}

                        <button
                            type="button" onClick={OnProfileClick}
                            className=" relative flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                           
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"//user link
                                alt="user photo"
                            />
                        </button> 
                        {/* Dropdown menu */}

                        {showProfile &&(

                        
                        <div
                            className="absolute right-0 top-15 z-50 w-56 bg-white rounded-xl shadow-lg border border-gray-300 "
                
                        >
                            <div className="py-3 px-4">

                                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                                    Neil Sims
                                </span>
                                <span className="block text-sm text-gray-900 truncate dark:text-white">
                                    name@flowbite.com
                                </span>
                            </div>
                            <ul
                                className="py-1 text-gray-700 dark:text-gray-300"
                                aria-labelledby="dropdown"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        My profile
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Account settings
                                    </a>
                                </li>
                            </ul>
                            <ul
                                className="py-1 text-gray-700 dark:text-gray-300"
                                aria-labelledby="dropdown"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            className="mr-2 w-5 h-5 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        My likes
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            className="mr-2 w-5 h-5 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                        Collections
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <span className="flex items-center">
                                            <svg
                                                aria-hidden="true"
                                                className="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Pro version
                                        </span>
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                            <ul
                                className="py-1 text-gray-700 dark:text-gray-300"
                                aria-labelledby="dropdown"
                            >
                                <li>
                                    <Link
                                        href="/Login"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Sign out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        )}
                    </div>

                    
                </div>
                
            </nav >
            
        </div >
    )
}
