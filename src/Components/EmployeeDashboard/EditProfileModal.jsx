"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfileModal({
    isOpen,
    onClose,
    user,
    setUser,
}) {

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

            // await axios.put(
            //     `https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/Admin/${user.id}`,
            //     updatedUser
            // );

            setUser(updatedUser);

            alert("Profile Updated Successfully.");

            onClose();

        } catch (error) {

            console.error(error);

            alert("Unable to update profile.");

        }

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">

                    Edit Profile

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Name */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    {/* Email (Read Only) */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                        />

                    </div>

                    {/* Phone */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) =>
                                setPhoneNumber(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    {/* Address */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Address
                        </label>

                        <textarea
                            rows="3"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                    </div>
                                        {/* Password */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    {/* Image URL */}

                    <div>

                        <label className="block mb-2 font-medium">
                            Image URL
                        </label>

                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) =>
                                setImageUrl(e.target.value)
                            }
                            className="w-full border rounded-lg p-3"
                            placeholder="https://example.com/profile.jpg"
                        />

                    </div>

                </div>

                {/* Image Preview */}

                <div className="mt-6 flex justify-center">

                    <img
                        src={
                            imageUrl ||
                            "https://via.placeholder.com/150"
                        }
                        alt=" "
                        className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                    />

                </div>

                {/* User Information */}

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

                    <div>

                        <p className="font-semibold">
                            User Type
                        </p>

                        <p className="text-gray-600">
                            {user.userType}
                        </p>

                    </div>

                    <div>

                        <p className="font-semibold">
                            Status
                        </p>

                        <p
                            className={`font-medium ${
                                user.status
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {user.status
                                ? "Present"
                                : "Absent"}
                        </p>

                    </div>

                    {user.userType === "Staff" && (

                        <>
                            <div>

                                <p className="font-semibold">
                                    Salary
                                </p>

                                <p className="text-gray-600">
                                    Rs.{" "}
                                    {Number(user.salary).toLocaleString()}
                                </p>

                            </div>

                            <div>

                                <p className="font-semibold">
                                    Joining Date
                                </p>

                                <p className="text-gray-600">
                                    {user.joiningDate
                                        ? new Date(
                                              user.joiningDate
                                          ).toLocaleDateString()
                                        : "N/A"}
                                </p>

                            </div>
                        </>

                    )}

                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>

    );

}