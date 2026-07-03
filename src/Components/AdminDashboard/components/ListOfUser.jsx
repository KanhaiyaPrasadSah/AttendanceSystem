"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListOfAllUser() {
    const [UserDetails, setUserDetails] = useState([]);

    // Edit States
    const [editUser, setEditUser] = useState(null);
    const [editEmployeeId, setEditEmployeeId] = useState("");
    const [editFullName, setEditFullName] = useState("");
    const [editGender, setEditGender] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editDepartment, setEditDepartment] = useState("");
    const [editMonthlySalary, setEditMonthlySalary] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const token = localStorage.getItem("token");
    // Fetch Users
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/employees/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUserDetails(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        getUserDetails();
    }, []);

    // Delete User
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/employees/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setUserDetails((prev) =>
                prev.filter((user) => user._id !== id)
            );

            alert("User deleted successfully.");
        } catch (error) {
            console.error(error);
        }
    };

    // Open Edit Form
    const handleEdit = (user) => {
        setEditUser(user);
        setEditEmployeeId(user.employeeId);
        setEditFullName(user.fullName);
        setEditGender(user.gender);
        setEditEmail(user.email);
        setEditDepartment(user.department);
        setEditMonthlySalary(user.monthlySalary);
        setEditStatus(user.status);
    };

    // Update User
    const handleUpdate = async () => {
        try {
            const updatedUser = {
                ...editUser,
                employeeId: editEmployeeId,
                fullName: editFullName,
                gender: editGender,
                email: editEmail,
                status: editStatus,
                department: editDepartment,
                monthlySalary: editMonthlySalary, 

            }; 
            await axios.put(
                `http://localhost:5000/api/employees/${editUser._id}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setUserDetails((prev) =>
                prev.map((user) =>
                    user._id === editUser._id ? updatedUser : user
                )
            );

            alert("User updated successfully.");

            setEditUser(null);
        } catch (error) {
            console.error(error);
        }
    };
    const totalUser = UserDetails.length;

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Heading */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        List of Users
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all registered Users.
                    </p>
                </div>

                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Total Users : {totalUser}
                </div>

            </div>

            {/* Edit Form */}

            {editUser && (
                <div className="bg-white shadow rounded-xl p-6 mb-6">

                    <h2 className="text-2xl font-bold mb-4">
                        Edit User
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input type="text" placeholder="Enter Employee ID" value={editEmployeeId} onChange={(e) => setEditEmployeeId(e.target.value)} className="border rounded p-3" />
                        <input type="text" placeholder="Enter Full Name" value={editFullName} onChange={(e) => setEditFullName(e.target.value)} className="border rounded p-3" />

                        <select value={editGender} onChange={(e) => setEditGender(e.target.value)} className="border rounded p-3">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="text" placeholder="Enter Your Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="border rounded p-3" />
                        <input type="text" placeholder="Status of Employee" value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="border rounded p-3" />
                        <input type="text" placeholder="Enter Your Department" value={editDepartment} onChange={(e) => setEditDepartment(e.target.value)} className="border rounded p-3" />
                        <input type="text" placeholder="Enter Your Monthly Salary" value={editMonthlySalary} onChange={(e) => setEditMonthlySalary(e.target.value)} className="border rounded p-3" />

                    </div>

                    <div className="flex gap-4 mt-6">

                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            Update
                        </button>

                        <button
                            onClick={() => setEditUser(null)}
                            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}

            {/* Table */}

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="w-full text-left">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="p-4">S.N.</th>
                            <th className="p-4">EmployeeId</th>

                            <th className="p-4">Full Name</th>
                            <th className="p-4">Gender</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Salary</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">
                                Actions
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {UserDetails.length > 0 ? (


                            UserDetails
                                .map((user, index) => (

                                    <tr
                                        key={user._id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4">
                                            {index + 1}
                                        </td>
                                        <td className="p-4">
                                            {user.employeeId}
                                        </td>

                                        <td className="p-4 font-medium">
                                            {user.fullName}
                                        </td>

                                        <td className="p-4">
                                            {user.gender}
                                        </td>
                                        <td className="p-4">
                                            {user.email}
                                        </td>
                                        <td className="p-4">
                                            {user.department}
                                        </td>
                                        <td className="p-4">
                                            {user.monthlySalary}
                                        </td>
                                        <td className="p-4">
                                            {user.status}
                                        </td>




                                        <td className="p-4">

                                            <div className="flex justify-center gap-3">

                                                <button
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(user._id)
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