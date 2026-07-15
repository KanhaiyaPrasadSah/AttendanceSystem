"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function AdminNavbar() {
    const [search, setSearch] = useState("");
    const [NotificationDetails, setNotificationDetails] = useState(null);
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        // if (!search.trim()) return;
        // if (search.trim() === Pages || search.trim() === pages) {
        //     setSearch("Pages");
        //     router.push(`/AdminDashboard/${search}`);
        // }
        // router.push(`/AdminDashboard/${search}`);
    };
    const NotificationOnClick = async (e) => {
        e.preventDefault();
    };
    
    const OnProfileClick = async (e) => {
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

                        {/* <form onSubmit={handleSearch} className="hidden md:block md:pl-2">
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
                        </form> */}
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

                                        {NotificationDetails.filter((emp) => emp.leaveRequest === true)
                                            .map((user) => (
                                                <div
                                                    key={user.id}
                                                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b transition"
                                                >
                                                    {/* Image */}
                                                    <img
                                                        src={user.imageUrl}
                                                        alt=""
                                                        className="w-14 h-14 rounded-lg object-cover"
                                                    />

                                                    {/* Content */}
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-gray-800 text-sm">
                                                            {user.name}
                                                        </h3>
                                                        <div className='flex'>
                                                            <p className='font-semibold'>
                                                                 {user.userType === "User"? "Student" : "Staff"} :
                                                                 {/* {displayUserType} : */}
                                                                 </p>
                                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                                 {" "} Leave Requested
                                                            </p>
                                                        </div>
 
                                                    </div>
                                                </div>
                                            ))}

                                    </div>
                                </div>
                            )}
                        </div>




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

                        {showProfile && (


                            <div
                                className="absolute right-0 top-15 z-50 w-56 bg-white rounded-xl shadow-lg border border-gray-300 "

                            >
                                <div className="py-3 px-4">

                                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                                        Admin
                                    </span>
                                    <span className="block text-sm text-gray-900 truncate dark:text-white">
                                        admin@gmail.com
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
                                     
                                </ul>
                                <ul
                                    className="py-1 text-gray-700 dark:text-gray-300"
                                    aria-labelledby="dropdown"
                                >
                                     
                                     
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
