"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListOfUser() {

    const [UserDetails, setUserDetails] = useState([]);

    useEffect(() => {

        const getUserDetails = async () => {

            try {

                const res = await axios.get(
                    "https://6a3f6f919b6d371e8380cdd2.mockapi.io/attendance"
                );

                console.log(res.data);

                setUserDetails(res.data);

            } catch (error) {

                console.error(error);

            }

        };

        getUserDetails();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `https://6a3f6f919b6d371e8380cdd2.mockapi.io/attendance/${id}`
            );

            setUserDetails((prev) =>
                prev.filter((user) => user.id !== id)
            );

            alert("User deleted successfully.");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            {/* Heading */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        List of Users
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all registered employees.
                    </p>

                </div>

                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">

                    Total Users : {UserDetails.length}

                </div>

            </div>

            {/* Table */}

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4">S.N.</th>

                            <th className="p-4">Name</th>

                            <th className="p-4">Email</th>

                            <th className="p-4">Status</th>

                            <th className="p-4">Leave Request</th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {UserDetails.length > 0 ? (

                            UserDetails.map((user, index) => (

                                <tr
                                    key={user.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {index + 1}
                                    </td>

                                    <td className="p-4 font-medium">
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
                                        {user.status
                                            ? "Present"
                                            : "Absent"}
                                    </td>

                                    <td className="p-4">

                                        {user.leaveRequest ? (

                                            <span className="text-blue-600 font-medium">
                                                Requested
                                            </span>

                                        ) : (

                                            <span className="text-gray-500">
                                                No
                                            </span>

                                        )}

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center p-8 text-gray-500"
                                >
                                    No Users Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}