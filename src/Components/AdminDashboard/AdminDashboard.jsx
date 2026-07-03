"use client";

import React, { useContext, useEffect, useState } from "react";

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
import { UserContext } from "../context/userContext";
import ListOfAllUser from "./components/ListOfAllUser";
import axios from "axios";

export default function AdminDashboard() {
    const { user, setUser } = useContext(UserContext);
    //  if (!user) {

    //     return (

    //         <div className="min-h-screen flex justify-center items-center">

    //             <h1 className="text-2xl font-bold text-red-600">

    //                 Please Login First

    //             </h1>

    //         </div>

    //     );

    // }
    useEffect(() => {
        // const verifyToken = async () => {
        //     const token = localStorage.getItem("token");

        //     if (!token) {
        //         router.push("/");
        //         return;
        //     }

        //     try {
        //         await axios.get("http://localhost:5000/api/auth/setup-check", {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         });

        //         console.log("Token verified");
        //     } catch (error) {
        //         console.log("Invalid token");

        //         localStorage.removeItem("token");
        //         router.push("/");
        //     }
        // };

        // verifyToken();
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
                className={`p-4 pt-20 transition-all duration-300 ${showSidebar ? "md:ml-64" : "ml-0"
                    }`}
            >

                {activePage === "overview" && <Overview />}

                {activePage === "listUser" && <ListOfUser />}
                {activePage === "listUserAll" && <ListOfAllUser />}

                {activePage === "addUser" && <AddUser />}
                {activePage === "ListOfEmployees" && <ListOfEmployees />}


                {activePage === "about" && <About />}



                {activePage === "feedback" && <Feedback />}

            </main>

        </div>
    );
}