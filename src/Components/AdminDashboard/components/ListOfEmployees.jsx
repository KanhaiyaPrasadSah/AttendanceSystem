"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListOfEmployee() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Edit States
    const [editEmployee, setEditEmployee] = useState(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editStatus, setEditStatus] = useState(false);
    const [editLeaveRequest, setEditLeaveRequest] = useState(false);
    const [editSalary, setEditSalary] = useState("");
    const [editJoiningDate, setEditJoiningDate] = useState("");
    const [editImageUrl, setEditImageUrl] = useState("");

    // ==========================
    // Fetch Employees
    // ==========================

    useEffect(() => {

        const getEmployees = async () => {

            try {

                const res = await axios.get(
                    "https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/Admin"
                );

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

    // ==========================
    // Delete Employee
    // ==========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/Admin/${id}`
            );

            setEmployees((prev) =>
                prev.filter((employee) => employee.id !== id)
            );

            alert("Employee deleted successfully.");

        } catch (error) {

            console.error(error);

        }

    };

    // ==========================
    // Open Edit Form
    // ==========================

    const handleEdit = (employee) => {

        setEditEmployee(employee);

        setEditName(employee.name);
        setEditEmail(employee.email);
        setEditStatus(employee.status);
        setEditLeaveRequest(employee.leaveRequest);
        setEditSalary(employee.salary);
        setEditJoiningDate(employee.joiningDate);
        setEditImageUrl(employee.imageUrl);

    };

    // ==========================
    // Update Employee
    // ==========================

    const handleUpdate = async () => {

        try {

            const updatedEmployee = {

                ...editEmployee,

                name: editName,
                email: editEmail,
                status: editStatus,
                leaveRequest: editLeaveRequest,
                salary: editSalary,
                joiningDate: editJoiningDate,
                imageUrl: editImageUrl,

            };

            await axios.put(
                `https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/Admin/${editEmployee.id}`,
                updatedEmployee
            );

            setEmployees((prev) =>
                prev.map((employee) =>
                    employee.id === editEmployee.id
                        ? updatedEmployee
                        : employee
                )
            );

            alert("Employee updated successfully.");

            setEditEmployee(null);

        } catch (error) {

            console.error(error);

        }

    };

    const totalEmployees = employees.filter(
        (employee) => employee.userType === "Staff"
    ).length;

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            {/* Heading */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        List of Employees
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all registered Employees.
                    </p>

                </div>

                <div className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow">

                    <h3 className="text-sm">
                        Total Employees
                    </h3>

                    <h1 className="text-3xl font-bold">
                        {totalEmployees}
                    </h1>

                </div>

            </div>

            {/* ==========================
                Edit Employee Form
            ========================== */}

            {editEmployee && (

                <div className="bg-white rounded-xl shadow p-6 mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Edit Employee
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            placeholder="Name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border rounded p-3"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="border rounded p-3"
                        />

                        <input
                            type="number"
                            placeholder="Salary"
                            value={editSalary}
                            onChange={(e) => setEditSalary(e.target.value)}
                            className="border rounded p-3"
                        />

                        <input
                            type="text"
                            placeholder="Joining Date"
                            value={editJoiningDate}
                            onChange={(e) => setEditJoiningDate(e.target.value)}
                            className="border rounded p-3"
                        />

                        <input
                            type="text"
                            placeholder="Image URL"
                            value={editImageUrl}
                            onChange={(e) => setEditImageUrl(e.target.value)}
                            className="border rounded p-3 md:col-span-2"
                        />

                        <select
                            value={editStatus}
                            onChange={(e) =>
                                setEditStatus(e.target.value === "true")
                            }
                            className="border rounded p-3"
                        >
                            <option value={true}>Present</option>
                            <option value={false}>Absent</option>
                        </select>

                        <select
                            value={editLeaveRequest}
                            onChange={(e) =>
                                setEditLeaveRequest(e.target.value === "true")
                            }
                            className="border rounded p-3"
                        >
                            <option value={true}>Requested</option>
                            <option value={false}>No Request</option>
                        </select>

                    </div>

                    <div className="flex gap-4 mt-6">

                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                        >
                            Update
                        </button>

                        <button
                            onClick={() => setEditEmployee(null)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            )}

            {/* Employee Table Starts Here */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">S.N.</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Leave Request</th>
                            <th className="p-4 text-left">Salary</th>
                            <th className="p-4 text-left">Joining Date</th>
                            <th className="p-4 text-center">Image</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>

                    </thead>

                    <tbody>
                        {loading ? (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="text-center p-8"
                                >
                                    Loading Employees...
                                </td>

                            </tr>

                        ) : error ? (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="text-center text-red-600 p-8"
                                >
                                    {error}
                                </td>

                            </tr>

                        ) : employees.filter(
                            (employee) => employee.userType === "Staff"
                        ).length === 0 ? (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="text-center p-8"
                                >
                                    No Employees Found
                                </td>

                            </tr>

                        ) : (

                            employees
                                .filter(
                                    (employee) =>
                                        employee.userType === "Staff"
                                )
                                .map((employee, index) => (

                                    <tr
                                        key={employee.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4">
                                            {index + 1}
                                        </td>

                                        <td className="p-4 font-medium">
                                            {employee.name}
                                        </td>

                                        <td className="p-4">
                                            {employee.email}
                                        </td>

                                        <td
                                            className={`p-4 font-semibold ${employee.status
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {employee.status
                                                ? "Present"
                                                : "Absent"}
                                        </td>

                                        <td className="p-4">

                                            {employee.leaveRequest ? (

                                                <span className="text-blue-600 font-medium">
                                                    Requested
                                                </span>

                                            ) : (

                                                <span className="text-gray-500">
                                                    No Request
                                                </span>

                                            )}

                                        </td>

                                        <td className="p-4">
                                            Rs.{" "}
                                            {Number(employee.salary).toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            {new Date(
                                                employee.joiningDate
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 text-center">

                                            {employee.imageUrl ? (

                                                <img
                                                    src={employee.imageUrl}
                                                    alt={employee.name}
                                                    className="w-12 h-12 rounded-full object-cover mx-auto border"
                                                />

                                            ) : (

                                                <span className="text-gray-400">
                                                    No Image
                                                </span>

                                            )}

                                        </td>

                                        <td className="p-4">

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() =>
                                                        handleEdit(employee)
                                                    }
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(employee.id)
                                                    }
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                                >
                                                    Delete
                                                </button>

                                            </div>

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