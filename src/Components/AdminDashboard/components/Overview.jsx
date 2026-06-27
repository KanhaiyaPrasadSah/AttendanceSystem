"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Overview() {

    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [usersRes, employeesRes] = await Promise.all([

                    axios.get(
                        "https://6a3f6f919b6d371e8380cdd2.mockapi.io/attendance"
                    ),

                    axios.get(
                        "https://6a3f6f919b6d371e8380cdd2.mockapi.io/employee"
                    )

                ]);

                setUsers(usersRes.data);
                setEmployees(employeesRes.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, []);

    const totalUsers = users.length;

    const totalEmployees = employees.length;

    const totalPresent = users.filter(
        (user) => user.status === true
    ).length;

    const totalAbsent = users.filter(
        (user) => user.status === false
    ).length;

    const totalLeaveRequest = users.filter(
        (user) => user.leaveRequest === true
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Total Users
                    </h3>

                    <h1 className="text-4xl font-bold mt-3">
                        {totalUsers}
                    </h1>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Total Employees
                    </h3>

                    <h1 className="text-4xl font-bold mt-3">
                        {totalEmployees}
                    </h1>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                       Users Present Today
                    </h3>

                    <h1 className="text-4xl font-bold text-green-600 mt-3">
                        {totalPresent}
                    </h1>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Users Absent Today
                    </h3>

                    <h1 className="text-4xl font-bold text-red-600 mt-3">
                        {totalAbsent}
                    </h1>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                       User's Leave Requests
                    </h3>

                    <h1 className="text-4xl font-bold text-blue-600 mt-3">
                        {totalLeaveRequest}
                    </h1>

                </div>

            </div>

            {/* Tables */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                {/* Recent Users */}

                <div className="bg-white rounded-xl shadow">

                    <div className="p-5 border-b">

                        <h2 className="text-xl font-semibold">
                            Recent Users
                        </h2>

                    </div>

                    <table className="w-full text-left">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4">
                                    Name
                                </th>

                                <th className="p-4">
                                    Email
                                </th>

                                <th className="p-4">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.slice(0, 5).map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {user.name}
                                    </td>

                                    <td className="p-4">
                                        {user.email}
                                    </td>

                                    <td
                                        className={`p-4 font-semibold ${
                                            user.status
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {user.status ? "Present" : "Absent"}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Recent Employees */}

                <div className="bg-white rounded-xl shadow">

                    <div className="p-5 border-b">

                        <h2 className="text-xl font-semibold">
                            Recent Employees
                        </h2>

                    </div>

                    <table className="w-full text-left">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4">
                                    Employee
                                </th>

                                <th className="p-4">
                                    Salary
                                </th>

                                <th className="p-4">
                                    Joining Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {employees.slice(0, 5).map((employee) => (

                                <tr
                                    key={employee.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4 font-medium">
                                        {employee.name}
                                    </td>

                                    <td className="p-4">
                                        Rs. {Number(employee.salary).toLocaleString()}
                                    </td>

                                    <td className="p-4">
                                        {employee.joining_date}
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