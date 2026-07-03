"use client";

import React, { useContext, useEffect, useState } from "react";

import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Sidebar from "./AdminSidebar/Sidebar";

import Overview from "./components/Overview";
import ListOfUser from "./components/ListOfUser";
import AddUser from "./components/AddUser";
 
import Reports from "./components/Reports";
import About from "./components/About";
 
import Feedback from "./components/Feedback";
import { UserContext } from "../context/userContext";
import EmployeeDashboard from "./components/EmployeeDashboard";
import axios from "axios";

export default function AdminDashboard() {
    const { user, setUser } = useContext(UserContext);
     
    useEffect(() => {
         
        const employees = async() =>{
        
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/employees/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(response);
        }
        employees();
    }, []);

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
                className={`p-4 pt-20 transition-all duration-300 overflow-x-auto ${showSidebar ? "md:ml-64" : "ml-0"
                    }`}
            >

                {activePage === "overview" && <Overview />}

                {activePage === "listUser" && <ListOfUser />}
                {activePage === "EmployeeDashboard" && <EmployeeDashboard />}

                {activePage === "addUser" && <AddUser />}
                {activePage === "reports" && <Reports />}
                {activePage === "about" && <About />}



                {activePage === "feedback" && <Feedback />}

            </main>

        </div>
    );
}