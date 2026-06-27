"use client";

import React from "react";

export default function About() {

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

                {/* Heading */}

                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    About Attendance Management System
                </h1>

                <p className="text-gray-500 mb-8">
                    An easy and efficient solution for managing employee attendance.
                </p>

                {/* About */}

                <div className="mb-8">

                    <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                        Overview
                    </h2>

                    <p className="text-gray-700 leading-8 text-justify">

                        The Attendance Management System is a web-based
                        application developed to simplify employee attendance
                        tracking and management. It enables administrators to
                        maintain employee records, monitor attendance, manage
                        leave requests, and generate reports from a single
                        dashboard.

                    </p>

                </div>

                {/* Features */}

                <div className="mb-8">

                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                        Key Features
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div className="bg-blue-50 rounded-lg p-5">
                            <h3 className="font-semibold text-lg">
                                👥 User Management
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Add, update, edit and delete employee records.
                            </p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-5">
                            <h3 className="font-semibold text-lg">
                                ✅ Attendance Tracking
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Record employee attendance with present and absent status.
                            </p>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-5">
                            <h3 className="font-semibold text-lg">
                                📝 Leave Management
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Monitor employee leave requests efficiently.
                            </p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-5">
                            <h3 className="font-semibold text-lg">
                                📊 Dashboard Analytics
                            </h3>

                            <p className="text-gray-600 mt-2">
                                View attendance summaries and employee statistics.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Technologies */}

                <div className="mb-8">

                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                        Technologies Used
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                        <div className="bg-gray-100 rounded-lg p-4 text-center font-medium">
                            React.js
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4 text-center font-medium">
                            Next.js
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4 text-center font-medium">
                            Tailwind CSS
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4 text-center font-medium">
                            Axios
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4 text-center font-medium">
                            MockAPI
                        </div>

                        <div className="bg-gray-100 rounded-lg p-4 text-center font-medium">
                            JavaScript
                        </div>

                    </div>

                </div>

                {/* Project Information */}

                <div className="bg-gray-50 rounded-lg p-6">

                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                        Project Information
                    </h2>

                    <table className="w-full">

                        <tbody>

                            <tr className="border-b">

                                <td className="py-3 font-semibold">
                                    Project Name
                                </td>

                                <td className="py-3">
                                    Attendance Management System
                                </td>

                            </tr>

                            <tr className="border-b">

                                <td className="py-3 font-semibold">
                                    Version
                                </td>

                                <td className="py-3">
                                    1.0.0
                                </td>

                            </tr>

                            <tr className="border-b">

                                <td className="py-3 font-semibold">
                                    Frontend
                                </td>

                                <td className="py-3">
                                    Next.js + React + Tailwind CSS
                                </td>

                            </tr>

                            <tr>

                                <td className="py-3 font-semibold">
                                    Backend
                                </td>

                                <td className="py-3">
                                    MockAPI REST API
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}