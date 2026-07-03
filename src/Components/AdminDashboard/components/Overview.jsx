"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Overview() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                 const res = await axios.get("http://localhost:5000/api/employees/",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        }
                    }
                );
 
                setUsers(res.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, []);

    const totalUsers = users.length;

     

    const totalUserActive = users.filter(
        (user) => user.status === "Active"
    ).length;
     
    const totalUserInactive = users.filter(
        (user) =>user.status === "Inactive"
    ).length;
    
 

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen text-xl font-semibold">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Dashboard Overview
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome back! Here's today's summary.
                </p>

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500 text-center">
                        Total Users
                    </h3>

                    <h1 className="text-4xl font-bold mt-3 text-center">
                        {totalUsers}
                    </h1>

                </div>

             

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500 text-center">
                        Total Active Users
                    </h3>

                    <h1 className="text-4xl font-bold text-green-600 mt-3 text-center">
                        {totalUserActive}
                    </h1>

                </div>
                

                <div className="bg-white rounded-xl shadow p-6 text-center">

                    <h3 className="text-gray-500">
                        Total Inactive Users
                    </h3>

                    <h1 className="text-4xl font-bold text-red-600 mt-3">
                        {totalUserInactive}
                    </h1>

                </div>
                 
 

            </div>

            {/* Tables */}

            <div className="overflow-x-auto grid grid-cols-1  gap-4 mt-8">

                {/* Recent Users */}

                <div className="bg-white overflow-x-auto rounded-xl shadow ">

                    <div className="p-5 border-b">

                        <h2 className="text-xl font-semibold">
                            Absentees Students
                        </h2>

                    </div>

                    <table className="overflow-x-auto w-full text-left border border-e-black">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4">
                                    Name
                                </th>

                                <th className="p-4">
                                    Email
                                </th>
                                <th className="p-4">
                                    EmployeeId
                                </th>
                                <th className="p-4">
                                    Department
                                </th>
                                <th className="p-4">
                                    Monthly Salary
                                </th>

                                <th className="p-4">
                                    Status
                                </th>
                                

                            </tr>

                        </thead>

                        <tbody>   

                            {users.filter((user) =>user.status === "Inactive")
                            .map((user) => (

                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {user.fullName}
                                    </td>

                                    <td className="p-4">
                                        {user.email}
                                    </td>
                                    <td className="p-4">
                                        {user.employeeId}
                                    </td>
                                    <td className="p-4">
                                        {user.department}
                                    </td>
                                    <td className="p-4">
                                        ${user.monthlySalary.toLocaleString()}
                                    </td>

                                    <td
                                        className={`p-4`}
                                    >
                                        {user.status}
                                    </td>
                                     

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                
 

            </div>

        </div>

    );

}