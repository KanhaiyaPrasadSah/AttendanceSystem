"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/userContext";

import EmployeeProfile from "./EmployeeProfile";
import AttendanceCard from "./AttendanceCard";
import LeaveRequestCard from "./LeaveRequestCard";
import EditProfileModal from "./EditProfileModal";

export default function Employee() {

    const router = useRouter();

    const { user, setUser } = useContext(UserContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {

        setUser(null);

        router.push("/Login");

    };

    // if (!user) {

    //     return (

    //         <div className="min-h-screen flex justify-center items-center">

    //             <h1 className="text-2xl font-bold text-red-600">

    //                 Please Login First

    //             </h1>

    //         </div>

    //     );

    // }

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Header */}

            <div className="bg-blue-700 text-white px-8 py-5 shadow">

                <div className="max-w-7xl mx-auto flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Employee Dashboard

                        </h1>

                        <p className="text-blue-100 mt-1">

                            Welcome, {user.name}

                        </p>

                    </div>

                    <div className="flex gap-3">

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-semibold"
                        >
                            Edit Profile
                        </button>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

         

            <div className="grid md:grid-cols-1 xl:grid-cols-2 max-w-5xl mx-auto p-6 space-y-8">

                 

                <AttendanceCard />
 

                <LeaveRequestCard />

            </div>

            

            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={user}
                setUser={setUser}
            />

        </div>

    );

}