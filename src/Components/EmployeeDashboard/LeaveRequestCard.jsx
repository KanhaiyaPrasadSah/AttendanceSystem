"use client";

import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/Components/context/userContext";

export default function LeaveRequestCard() {

    const { user, setUser } = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const handleLeaveRequest = async () => {

        if (user.leaveRequest) {

            alert("You have already submitted a leave request.");

            return;

        }

        try {

            setLoading(true);

            const updatedUser = {

                ...user,

                leaveRequest: true

            };

            await axios.put(
                `https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/Admin/${user.id}`,
                updatedUser
            );

            setUser(updatedUser);

            alert("Leave request submitted successfully.");

        } catch (error) {

            console.error(error);

            alert("Unable to submit leave request.");

        } finally {

            setLoading(false);

        }

    };

    if (!user) {

        return (

            <div className="text-center mt-10 text-red-600">

                User not found.

            </div>

        );

    }

    return (

        <div className="max-w-3xl mx-auto mt-10">

            <div className="bg-white rounded-xl shadow-lg p-8">

                <h2 className="text-2xl font-bold text-gray-800">

                    Leave Request

                </h2>

                <p className="text-gray-500 mt-2">

                    Submit your leave request to the administrator.

                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                    <div>

                        <h3 className="font-semibold text-gray-700">

                            User Name

                        </h3>

                        <p className="mt-2">

                            {user.name}

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold text-gray-700">

                            User ID

                        </h3>

                        <p className="mt-2">

                            {user.id}

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold text-gray-700">

                            Email

                        </h3>

                        <p className="mt-2">

                            {user.email}

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold text-gray-700">

                            Current Status

                        </h3>
                                                <p
                            className={`mt-2 font-semibold ${
                                user.leaveRequest
                                    ? "text-blue-600"
                                    : "text-gray-600"
                            }`}
                        >
                            {user.leaveRequest
                                ? "Leave Requested"
                                : "No Leave Request"}
                        </p>

                    </div>

                </div>

                {/* Status Card */}

                <div className="mt-8">

                    {user.leaveRequest ? (

                        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">

                            <h3 className="text-blue-700 font-bold">

                                Leave Request Submitted

                            </h3>

                            <p className="text-blue-600 mt-2">

                                Your leave request has been sent to the administrator.
                                Please wait for approval.

                            </p>

                        </div>

                    ) : (

                        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">

                            <h3 className="text-yellow-700 font-bold">

                                No Leave Request

                            </h3>

                            <p className="text-yellow-700 mt-2">

                                You haven't requested leave yet.

                            </p>

                        </div>

                    )}

                </div>

                {/* Button */}

                <div className="mt-8">

                    <button
                        onClick={handleLeaveRequest}
                        disabled={loading || user.leaveRequest}
                        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                            user.leaveRequest
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >

                        {loading
                            ? "Submitting..."
                            : user.leaveRequest
                            ? "Leave Request Submitted"
                            : "Request Leave"}

                    </button>

                </div>

            </div>

        </div>

    );

}