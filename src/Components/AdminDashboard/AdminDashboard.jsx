"use client";

import React, { useState } from "react";

import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Sidebar from "./AdminSidebar/Sidebar";

import Overview from "./components/Overview";
import ListOfUser from "./components/ListOfUser";
import AddUser from "./components/AddUser";
import ListOfEmployees from "./components/ListOfEmployees";
// import EditUser from "./components/EditUser";
import About from "./components/About";
// import Docs from "./components/Docs";
import Feedback from "./components/Feedback";

export default function AdminDashboard() {

    // Current page
    const [activePage, setActivePage] = useState("overview");

    // Sidebar visibility
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* Navbar */}
            <AdminNavbar />

            {/* Sidebar */}
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />

            {/* Main Content */}
            <main
                className={`p-4 pt-20 transition-all duration-300 ${
                    showSidebar ? "md:ml-64" : "ml-0"
                }`}
            >

                {activePage === "overview" && <Overview />}

                 {activePage === "listUser" && <ListOfUser />}

                {activePage === "addUser" && <AddUser />}
                {activePage === "ListOfEmployees" && <ListOfEmployees />}
                

                {activePage === "about" && <About />}

              

                {activePage === "feedback" && <Feedback />} 

            </main>

        </div>
    );
}