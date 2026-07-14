"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({
    activePage,
    setActivePage,
    showSidebar,
    setShowSidebar,
}) {

    const [showUsersMenu, setShowUsersMenu] = useState(false);
    const [showEmployeesMenu, setShowEmployeesMenu] = useState(false);
    const router = useRouter();

    return (
        <>
            {/* Mobile Toggle Button */}

            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`fixed top-12 left-4 z-50 p-2 bg-white rounded-lg shadow-lg md:hidden transition-all ${showSidebar? "left-64": "left-0"}`}
            >
                ☰ 
            </button>

            {/* Desktop Toggle Button */}

            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`fixed top-20 z-50 hidden md:block p-2 bg-white shadow rounded-r-lg transition-all ${
                    showSidebar ? "left-64" : "left-0"
                }`}
            >
                {showSidebar ? " ☰" : "☰"}
            </button>

            {/* Sidebar */}

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 transition-transform duration-300 ${
                    showSidebar
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >
                <div className="h-full px-3 pb-4 overflow-y-auto">

                    <ul className="space-y-2">

                        {/* ================= Overview ================= */}

                        <li>

                            <button
                                onClick={() => setActivePage("overview")}
                                className={`w-full flex items-center p-2 rounded-lg ${
                                    activePage === "overview"
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                📊
                                <span className="ml-3">
                                    Overview
                                </span>
                            </button>

                        </li>

                        {/* ================= Users ================= */}

                        <li>

                            <button
                                onClick={() =>
                                    setShowUsersMenu(!showUsersMenu)
                                }
                                className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100"
                            >
                                👥

                                <span className="flex-1 ml-3 text-left">
                                    Users
                                </span>

                                <span>
                                    {showUsersMenu ? "▲" : "▼"}
                                </span>

                            </button>

                            {showUsersMenu && (

                                <ul className="ml-8 mt-2 space-y-1">

                                     <li>

                                        <button
                                            onClick={() =>
                                                setActivePage("listUser")
                                            }
                                            className={`w-full text-left p-2 rounded ${
                                                activePage === "listUser"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            List of User
                                        </button>

                                    </li>
                                    
                                    
                                    <li>

                                        <button
                                            onClick={() =>
                                                setActivePage("addUser")
                                            }
                                            className={`w-full text-left p-2 rounded ${
                                                activePage === "addUser"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            Add User
                                        </button>

                                    </li>

                                </ul>

                            )}

                        </li>

                        {/* ================= Employees ================= */}

                        <li>

                            <button
                                onClick={() =>
                                    setShowEmployeesMenu(!showEmployeesMenu)
                                }
                                className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100"
                            >
                                👨‍💼

                                <span className="flex-1 ml-3 text-left">
                                    Employees
                                </span>

                                <span>
                                    {showEmployeesMenu ? "▲" : "▼"}
                                </span>

                            </button>

                            {showEmployeesMenu && (

                                <ul className="ml-8 mt-2 space-y-1">

                                    <li>

                                        <button
                                            onClick={() =>
                                                setActivePage("EmployeeDashboard")
                                            }
                                            className={`w-full text-left p-2 rounded ${
                                                activePage === "EmployeeDashboard"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            Employee Dashboard
                                        </button>

                                    </li>
                                   


                                    {/* <li>

                                        <button
                                            onClick={() =>
                                                setActivePage("addEmployee")
                                            }
                                            className={`w-full text-left p-2 rounded ${
                                                activePage === "addEmployee"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                            }`}
                                        >
                                            Add Employee
                                        </button>

                                    </li> */}

                                </ul>

                            )}

                        </li>
                        {/* =========================Reports======================== */}
                        <li>

                            <button
                                onClick={() => setActivePage("reports")}
                                className={`w-full flex items-center p-2 rounded-lg ${
                                    activePage === "reports"
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                ℹ️

                                <span className="ml-3">
                                    Reports
                                </span>

                            </button>

                        </li>
                        

                        {/* ================= About ================= */}

                        <li>

                            <button
                                onClick={() => setActivePage("about")}
                                className={`w-full flex items-center p-2 rounded-lg ${
                                    activePage === "about"
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                ℹ️

                                <span className="ml-3">
                                    About
                                </span>

                            </button>

                        </li>

                        {/* ================= Feedback ================= */}

                        <li>

                            <button
                                onClick={() => setActivePage("feedback")}
                                className={`w-full flex items-center p-2 rounded-lg ${
                                    activePage === "feedback"
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                💬

                                <span className="ml-3">
                                    Feedback
                                </span>

                            </button>

                        </li>

                        <li>

                            <button
                                onClick={() => router.push("/Login")}
                                className={`w-full flex items-center p-2 rounded-lg`}
                            >
                                

                                <span className="ml-3">
                                    LogOut
                                </span>

                            </button>

                        </li>
                         

                    </ul>

                </div>

            </aside>
        </>
    );
}