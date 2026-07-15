import React, { useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios';
import { Calendar, Search, X, ChevronUp, ChevronDown, Sheet } from "lucide-react";
import * as XLSX from "xlsx";

// Wraps the portion of `text` that matches `term` in a <mark> tag
function HighlightText({ text, term }) {
    if (!term || !text) return <>{text}</>;

    const lowerText = text.toString();
    const lowerTerm = term;
    const index = lowerText.toLowerCase().indexOf(lowerTerm.toLowerCase());

    if (index === -1) return <>{text}</>;

    const before = lowerText.slice(0, index);
    const match = lowerText.slice(index, index + lowerTerm.length);
    const after = lowerText.slice(index + lowerTerm.length);

    return (
        <>
            {before}
            <mark className="rounded bg-yellow-200 px-0.5 text-slate-900">{match}</mark>
            {after}
        </>
    );
}

export default function Reports() {
    const [users, setUsers] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

    // Holds a live map of { userId: <tr> DOM node } so we can scroll to any row
    const rowRefs = useRef({});

    function formatDisplayDate(date) {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/employees/",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        }
                    }
                );
                setUsers(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    // Step 1: filter by date range (unchanged from before)
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const joined = new Date(user.joiningDate).toISOString().split("T")[0];
            if (startDate && joined < startDate) return false;
            if (endDate && joined > endDate) return false;
            return true;
        });
    }, [users, startDate, endDate]);

    // Step 2: of the date-filtered rows, work out which ones match the search term
    function isMatch(user, term) {
        if (!term) return false;
        const t = term.toLowerCase();
        return (
            user.fullName?.toLowerCase().includes(t) ||
            user.email?.toLowerCase().includes(t) ||
            user.department?.toLowerCase().includes(t) ||
            user.status?.toLowerCase().includes(t)
        );
    }

    const matchedUsers = useMemo(() => {
        if (!searchTerm) return [];
        return filteredUsers.filter((user) => isMatch(user, searchTerm));
    }, [filteredUsers, searchTerm]);

    const activeMatch = matchedUsers[currentMatchIndex] || null;

    // Whenever the search term changes, jump back to the first match
    useEffect(() => {
        setCurrentMatchIndex(0);
    }, [searchTerm]);

    // Whenever the active match changes, scroll that row into view
    useEffect(() => {
        if (!activeMatch) return;
        const node = rowRefs.current[activeMatch._id];
        if (node) {
            node.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [activeMatch]);

    const goToNextMatch = () => {
        if (matchedUsers.length === 0) return;
        setCurrentMatchIndex((prev) => (prev + 1) % matchedUsers.length);
    };

    const goToPrevMatch = () => {
        if (matchedUsers.length === 0) return;
        setCurrentMatchIndex((prev) => (prev - 1 + matchedUsers.length) % matchedUsers.length);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.shiftKey) {
                goToPrevMatch();
            } else {
                goToNextMatch();
            }
        }
    };

    const clearFilters = () => {
        setStartDate("");
        setEndDate("");
    };
    const clearSearch = () => {
        setSearchTerm("");
        setCurrentMatchIndex(0);
    };
    const hasActiveFilter = startDate || endDate;
     

    const downloadFile = () => {
        const table = document.getElementById("user-table");
        const workbook = XLSX.utils.table_to_book(table,{ sheet: "Reports"});
        XLSX.writeFile(workbook,"Report.xlsx");
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
            <div className="mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-6">
                    <header className="mb-6">
                        <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Filter the list by the date each user joined, or search for a specific person.
                        </p>
                    </header>
                    <button onClick={downloadFile} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Download
                    </button>
                </div>

                {/* Search bar */}
                <div className="mb-4 flex max-w-2xl items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Search by name, email, department, status..."
                            className="w-full rounded-md border border-slate-300 py-2 pl-8 pr-3 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {searchTerm && (
                        <div className="flex items-center gap-1">
                            <span className="whitespace-nowrap text-sm text-slate-500">
                                {matchedUsers.length > 0
                                    ? `${currentMatchIndex + 1} of ${matchedUsers.length}`
                                    : "0 results"}
                            </span>
                            <button
                                onClick={goToPrevMatch}
                                disabled={matchedUsers.length === 0}
                                className="rounded-md border border-slate-300 p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:opacity-40"
                                title="Previous match (Shift+Enter)"
                            >
                                <ChevronUp className="h-4 w-4" />
                            </button>
                            <button
                                onClick={goToNextMatch}
                                disabled={matchedUsers.length === 0}
                                className="rounded-md border border-slate-300 p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:opacity-40"
                                title="Next match (Enter)"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Date filter controls */}
                <div className="mb-5 flex flex-wrap items-end gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="start-date" className="text-xs font-medium text-slate-600">
                            From
                        </label>
                        <div className="relative">
                            <Calendar className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                max={endDate || undefined}
                                className="rounded-md border border-slate-300 py-1.5 pl-8 pr-3 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="end-date" className="text-xs font-medium text-slate-600">
                            To
                        </label>
                        <div className="relative">
                            <Calendar className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate || undefined}
                                className="rounded-md border border-slate-300 py-1.5 pl-8 pr-3 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {hasActiveFilter && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100"
                        >
                            <X className="h-3.5 w-3.5" />
                            Clear
                        </button>
                    )}

                    <div className="ml-auto text-sm text-slate-500">
                        {filteredUsers.length} of {users.length} users
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm max-w-auto">
                    <table id="user-table" className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Department</th>
                                <th className="px-4 py-3 font-medium">Monthly Salary</th>
                                <th className="px-4 py-3 font-medium">Joined</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => {
                                    const isMatched = searchTerm && isMatch(user, searchTerm);
                                    const isActive = activeMatch?._id === user._id;

                                    return (
                                        <tr
                                            key={user._id}
                                            ref={(node) => {
                                                rowRefs.current[user._id] = node;
                                            }}
                                            className={`transition ${isActive
                                                ? "bg-indigo-50 ring-1 ring-inset ring-indigo-300"
                                                : isMatched
                                                    ? "bg-yellow-50 hover:bg-yellow-100"
                                                    : "hover:bg-slate-50"
                                                }`}
                                        >
                                            <td className="px-4 py-3 font-medium text-slate-800">
                                                <HighlightText text={user.fullName} term={searchTerm} />
                                            </td>
                                            <td className="px-4 py-3 text-slate-500">
                                                <HighlightText text={user.email} term={searchTerm} />
                                            </td>
                                            <td className="px-4 py-3 text-slate-500">
                                                <HighlightText text={user.department} term={searchTerm} />
                                            </td>
                                            <td className="px-4 py-3 text-slate-500">${user.monthlySalary}</td>
                                            <td className="px-4 py-3 text-slate-500">{formatDisplayDate(user.joiningDate)}</td>
                                            <td className="px-4 py-3 text-slate-500">
                                                <HighlightText text={user.status} term={searchTerm} />
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                                        <Search className="mx-auto mb-2 h-5 w-5" />
                                        No users joined in this date range.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



