"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@/Components/context/userContext";

export default function AttendanceCard() {

    const { user, setUser } = useContext(UserContext);

    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [loading, setLoading] = useState(false);

    const today = new Date().toLocaleDateString();

    useEffect(() => {

        if (!user) return;

        const attendanceData =
            JSON.parse(localStorage.getItem("attendance")) || {};

        if (
            attendanceData[user.id] &&
            attendanceData[user.id] === today
        ) {

            setAttendanceMarked(true);

        }

    }, [user, today]);

    const handleMarkAttendance = async () => {

        if (attendanceMarked) {

            alert("Attendance already marked today.");
            return;

        }

        try {

            setLoading(true);

            const updatedUser = {

                ...user,

                status: true

            };

            await axios.put(
                `http://localhost:5000/api/attendance/${user.id}`,
                updatedUser
            );

            setUser(updatedUser);

            const attendanceData =
                JSON.parse(localStorage.getItem("attendance")) || {};

            attendanceData[user.id] = today;

            localStorage.setItem(
                "attendance",
                JSON.stringify(attendanceData)
            );

            setAttendanceMarked(true);

            alert("Attendance marked successfully.");

        } catch (error) {

            console.error(error);

            alert("Unable to mark attendance.");

        } finally {

            setLoading(false);

        }

    };

    if (!user) {

        return (

            <div className="text-center text-red-600 mt-10">

                User not found.

            </div>

        );

    }

    return (        <div className="max-w-3xl mx-auto mt-10">

            <div className="bg-white rounded-xl shadow-lg p-8">

                <h2 className="text-2xl font-bold text-gray-800">
                    Attendance
                </h2>

                <p className="text-gray-500 mt-2">
                    Mark your attendance for today.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                    <div>

                        <h3 className="text-gray-600 font-semibold">
                            User Name
                        </h3>

                        <p className="mt-2 text-lg">
                            {user.name}
                        </p>

                    </div>

                    <div>

                        <h3 className="text-gray-600 font-semibold">
                            Today's Date
                        </h3>

                        <p className="mt-2 text-lg">
                            {today}
                        </p>

                    </div>

                    <div>

                        <h3 className="text-gray-600 font-semibold">
                            Attendance Status
                        </h3>

                        <p
                            className={`mt-2 font-bold text-lg ${
                                attendanceMarked
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {attendanceMarked
                                ? "Present"
                                : "Absent"}
                        </p>

                    </div>

                    <div>

                        <h3 className="text-gray-600 font-semibold">
                            User ID
                        </h3>

                        <p className="mt-2 text-lg">
                            {user.id}
                        </p>

                    </div>

                </div>

                <div className="mt-10">

                    <button
                        onClick={handleMarkAttendance}
                        disabled={attendanceMarked || loading}
                        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                            attendanceMarked
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >

                        {loading
                            ? "Marking Attendance..."
                            : attendanceMarked
                            ? "Attendance Already Marked"
                            : "Mark Attendance"}

                    </button>

                </div>

                {attendanceMarked && (

                    <div className="mt-6 bg-green-100 border border-green-300 rounded-lg p-4">

                        <p className="text-green-700 font-medium">

                            ✅ Your attendance has been marked successfully for today.

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}