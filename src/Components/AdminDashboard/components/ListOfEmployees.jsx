"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListOfEmployee() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const getEmployees = async () => {

            try {

                const res = await axios.get(
                    "https://6a3f6f919b6d371e8380cdd2.mockapi.io/employee"
                );

                console.log(res.data);

                setEmployees(res.data);

            } catch (err) {

                console.error(err);
                setError("Unable to fetch employee data.");

            } finally {

                setLoading(false);

            }

        };

        getEmployees();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            {/* Heading */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        List of Employees
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View all registered employees.
                    </p>

                </div>

                <div className="bg-blue-600 text-white rounded-xl shadow-lg px-6 py-4">

                    <h3 className="text-sm">
                        Total Employees
                    </h3>

                    <h1 className="text-3xl font-bold">
                        {employees.length}
                    </h1>

                </div>

            </div>

            {/* Table */}

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                ID
                            </th>

                            <th className="p-4 text-left">
                                Employee
                            </th>

                            <th className="p-4 text-left">
                                Salary
                            </th>

                            <th className="p-4 text-left">
                                Joining Date
                            </th>

                            <th className="p-4 text-center">
                                Profile Image
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center p-8"
                                >
                                    Loading Employees...
                                </td>

                            </tr>

                        ) : error ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center text-red-600 p-8"
                                >
                                    {error}
                                </td>

                            </tr>

                        ) : employees.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center p-8"
                                >
                                    No Employees Found
                                </td>

                            </tr>

                        ) : (

                            employees.map((employee) => (

                                <tr
                                    key={employee.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {employee.id}
                                    </td>

                                    <td className="p-4 font-medium">
                                        {employee.name}
                                    </td>

                                    <td className="p-4">
                                        Rs.{" "}
                                        {Number(employee.salary).toLocaleString()}
                                    </td>

                                    <td className="p-4">
                                        {employee.joining_date}
                                    </td>

                                    <td className="p-4 text-center">

                                        {employee.image_url ? (

                                            <img
                                                src={employee.image_url}
                                                alt={employee.name}
                                                className="w-12 h-12 rounded-full object-cover mx-auto border"
                                            />

                                        ) : (

                                            <span className="text-gray-400">
                                                No Image
                                            </span>

                                        )}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}