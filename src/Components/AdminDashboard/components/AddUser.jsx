"use client";

import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function AddUser() {

     
    const handleOnSubmit = async (e) => {

        e.preventDefault();

        try {
             

            const userData = {

                employeeId: e.target.EmployeeId.value,
                fullName: e.target.FullName.value,
                gender: e.target.Gender.value,
                contactNumber: e.target.ContactNumber.value,
                email: e.target.Email.value,
                address: e.target.Address.value,
                joiningDate: e.target.JoiningDate.value,
                department: e.target.Department.value,
                bankName: e.target.BankName.value,
                accountNumber: e.target.BankAccountNumber.value,
                ifscCode: e.target.IfscCode.value,
                monthlySalary: e.target.MonthlySalary.value,
            };
            const token = localStorage.getItem("token");
            const res = await axios.post(
                
                "http://localhost:5000/api/employees/",
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(res.data);

            toast.success("User added successfully.");

        } catch (error) {

            if (error.response) {
                toast.error(error.response.data.message);
                alert("Empty user details");
              }  

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Add User 
                </h1>

                <p className="text-gray-500 mt-2 mb-8">
                    Fill in the details below.
                </p>

                <form
                    onSubmit={handleOnSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                    <div>
                        <label className="block mb-2 font-medium">Enter Employee Id </label>
                        <input name="EmployeeId" type="text" placeholder="Enter Employee Id" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Full Name </label>
                        <input name="FullName" type="text" placeholder="Enter Your Full Name" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Select Your Gender </label>
                        <select name="Gender" className="w-full border rounded-lg p-3">
                             
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Contact Number </label>
                        <input name="ContactNumber" type="text" placeholder="Enter Your Contact Number" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Email Id </label>
                        <input name="Email" type="text" placeholder="Enter Your Email Id" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Address </label>
                        <input name="Address" type="text" placeholder="Enter Your Address" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Joining Date </label>
                        <input name="JoiningDate" type="Date" placeholder="Enter Joining Date" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Full Department </label>
                        <input name="Department" type="text" placeholder="Enter YourDepartment" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Bank Name </label>
                        <input name="BankName" type="text" placeholder="Enter Your Bank Name" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Bank Account Number </label>
                        <input name="BankAccountNumber" type="text" placeholder="Enter Your Bank Account Number" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Ifsc code </label>
                        <input name="IfscCode" type="text" placeholder="Enter Your Ifsc code" className="w-full border rounded-lg p-3"/>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Enter Your Monthly Salary </label>
                        <input name="MonthlySalary" type="text" placeholder="Enter Your Monthly Salary" className="w-full border rounded-lg p-3"/>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 duration-200 max-w-max shadow-md col-span-full md:col-span-1"
                    >
                        Add User
                    </button>

                </form>

            </div>
        </div>

    );

}