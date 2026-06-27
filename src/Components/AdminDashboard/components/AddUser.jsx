"use client";

import React, { useState } from "react";
import axios from "axios";

export default function AddUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [id, setId] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/register",
                {
                    name,
                    email,
                    phoneNumber,
                    id,
                    address,
                    password,
                }
            );

            console.log(res.data);

            alert("User added successfully.");

            // Clear Form
            setName("");
            setEmail("");
            setPhoneNumber("");
            setId("");
            setAddress("");
            setPassword("");

        } catch (error) {

            console.error(error);

            alert("Unable to add user.");

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Add User
                </h1>

                <p className="text-gray-500 mb-8">
                    Fill in the employee details below.
                </p>

                <form
                    onSubmit={handleOnSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                    <div>
                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter name"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Employee ID
                        </label>

                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter employee ID"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">
                            Address
                        </label>

                        <textarea
                            rows="3"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter address"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">

                        <button
                            type="reset"
                            onClick={() => {

                                setName("");
                                setEmail("");
                                setPhoneNumber("");
                                setId("");
                                setAddress("");
                                setPassword("");

                            }}
                            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add User
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}