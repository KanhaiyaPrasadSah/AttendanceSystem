"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "@/Components/context/userContext";

export default function EmployeeProfile() {

    const { user, setUser } = useContext(UserContext);

    const [editMode, setEditMode] = useState(false);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {

        if (user) {

            setName(user.name || "");
            setPhoneNumber(user.phoneNumber || "");
            setAddress(user.address || "");
            setPassword(user.password || "");
            setImageUrl(user.imageUrl || "");

        }

    }, [user]);

    const handleUpdate = async () => {

        try {

            const updatedUser = {

                ...user,

                name,
                phoneNumber,
                address,
                password,
                imageUrl

            };

            await axios.put(
                `https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/Admin/${user.id}`,
                updatedUser
            );

            setUser(updatedUser);

            alert("Profile Updated Successfully.");

            setEditMode(false);

        } catch (error) {

            console.error(error);

            alert("Unable to update profile.");

        }

    };

    if (!user) {

        return (

            <div className="text-center mt-20 text-red-600 text-xl">

                User not found.

            </div>

        );

    }

    return (

        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

            <div className="flex flex-col md:flex-row gap-8 items-center">

                {/* Profile Image */}

                <div>

                    <img
                        src={
                            imageUrl ||
                            "https://via.placeholder.com/150"
                        }
                        alt={user.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                    />

                </div>

                {/* Profile Information */}

                <div className="flex-1">

                    <h1 className="text-3xl font-bold text-gray-800">

                        Employee Profile

                    </h1>

                    <p className="text-gray-500 mt-1">

                        View and manage your account.

                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                        {/* Name */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Full Name
                            </label>

                            {editMode ? (

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                            ) : (

                                <p className="mt-2 text-gray-600">
                                    {user.name}
                                </p>

                            )}

                        </div>

                        {/* Email */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Email
                            </label>

                            <p className="mt-2 text-gray-600">
                                {user.email}
                            </p>

                        </div>

                        {/* Phone */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Phone Number
                            </label>

                            {editMode ? (

                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                            ) : (

                                <p className="mt-2 text-gray-600">
                                    {user.phoneNumber}
                                </p>

                            )}

                        </div>

                        {/* Address */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Address
                            </label>

                            {editMode ? (

                                <textarea
                                    rows="2"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(e.target.value)
                                    }
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                            ) : (

                                <p className="mt-2 text-gray-600">
                                    {user.address}
                                </p>

                            )}

                        </div>

                        {/* Password */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Password
                            </label>

                            {editMode ? (

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                            ) : (

                                <p className="mt-2 text-gray-600">
                                    ********
                                </p>

                            )}

                        </div>

                        {/* Salary */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Salary
                            </label>

                            <p className="mt-2 text-gray-600">
                                Rs. {Number(user.salary).toLocaleString()}
                            </p>

                        </div>

                        {/* Joining Date */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Joining Date
                            </label>

                            <p className="mt-2 text-gray-600">
                                {user.joiningDate
                                    ? new Date(
                                        user.joiningDate
                                    ).toLocaleDateString()
                                    : "N/A"}
                            </p>

                        </div>

                        {/* Attendance */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Attendance
                            </label>

                            <p
                                className={`mt-2 font-semibold ${user.status
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {user.status
                                    ? "Present"
                                    : "Absent"}
                            </p>

                        </div>

                        {/* Leave */}

                        <div>

                            <label className="font-semibold text-gray-700">
                                Leave Request
                            </label>

                            <p
                                className={`mt-2 font-semibold ${user.leaveRequest
                                        ? "text-blue-600"
                                        : "text-gray-600"
                                    }`}
                            >
                                {user.leaveRequest
                                    ? "Requested"
                                    : "No Request"}
                            </p>

                        </div>

                        {/* Image URL */}

                        {editMode && (

                            <div className="md:col-span-2">

                                <label className="font-semibold text-gray-700">
                                    Image URL
                                </label>

                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) =>
                                        setImageUrl(e.target.value)
                                    }
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                            </div>

                        )}

                    </div>

                    <div className="flex gap-4 mt-8">

                        {editMode ? (

                            <>

                                <button
                                    onClick={handleUpdate}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() =>
                                        setEditMode(false)
                                    }
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Cancel
                                </button>

                            </>

                        ) : (

                            <button
                                onClick={() =>
                                    setEditMode(true)
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                Edit Profile
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}