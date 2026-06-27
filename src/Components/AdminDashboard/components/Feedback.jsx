"use client";

import React, { useState } from "react";

export default function Feedback() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        const feedback = {
            name,
            email,
            subject,
            message,
        };

        console.log(feedback);

        alert("Thank you for your feedback!");

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Feedback
                </h1>

                <p className="text-gray-500 mb-8">
                    We'd love to hear your thoughts and suggestions.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Subject
                        </label>

                        <input
                            type="text"
                            placeholder="Feedback subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Message
                        </label>

                        <textarea
                            rows="5"
                            placeholder="Write your feedback here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Submit Feedback
                    </button>

                </form>

            </div>

        </div>

    );
}