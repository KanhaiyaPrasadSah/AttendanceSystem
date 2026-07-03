"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);

  // Default values
  const [status] = useState("");
  const [overtimeHours] = useState(0);

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/employees",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEmployees(res.data);

      // Initialize attendance using status and overtimeHours
      setAttendance(
        res.data.map((emp) => ({
          employee: emp._id,
          status,
          overtimeHours,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/attendance/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Handle dashboard data
        console.log("Dashboard Data:", res.data);
        setDashboardData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboardData();
  }, []);

  // Update only one employee's status
  const handleStatus = (index, value) => {
    setAttendance((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, status: value }
          : item
      )
    );
  };

  // Update only one employee's overtime
  const handleOvertime = (index, value) => {
    setAttendance((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
            ...item,
            overtimeHours: Number(value),
          }
          : item
      )
    );
  };

  const markAttendance = async () => {
    try {
      const payload = {
        date,
        records: attendance,
      };

      console.log(payload);

      const res = await axios.post(
        "http://localhost:5000/api/attendance/bulk",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      alert("Attendance Marked Successfully");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(
        err.response?.data?.message ||
        "Unable to mark attendance"
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          Employee Attendance Dashboard
        </h1>

         
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5 mb-5">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Absent Today</h3>
          <p className="text-2xl">{dashboardData.absentToday}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Active Employees</h3>
          <p className="text-2xl">{dashboardData.activeEmployees}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Leave Today</h3>
          <p className="text-2xl">{dashboardData.leaveToday}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Present Today</h3>
          <p className="text-2xl">{dashboardData.presentToday}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Employees</h3>
          <p className="text-2xl">{dashboardData.totalEmployees}</p>
        </div>
      </div>
       <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          Mark Attendance
        </h1>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Employee Name</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Overtime</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id}>
              <td className="border p-2">{emp.employeeId}</td>

              <td className="border p-2">{emp.fullName}</td>

              <td className="border p-2">{emp.department}</td>

              <td className="border p-2">
                <select
                  value={attendance[index]?.status || status}
                  onChange={(e) =>
                    handleStatus(index, e.target.value)
                  }
                  className="border rounded p-1 w-full"
                >
                  <option value="">Select Status</option>
                  <option value="Absent">Absent</option>
                  <option value="Present">Present</option>
                  <option value="Half Day">Half Day</option>
                  <option value="Paid Leave">Paid Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Holiday">Holiday</option>
                </select>
              </td>

              <td className="border p-2">
                <input
                  type="number"
                  min="0"
                  value={
                    attendance[index]?.overtimeHours ??
                    overtimeHours
                  }
                  onChange={(e) =>
                    handleOvertime(index, e.target.value)
                  }
                  className="border rounded p-1 w-20"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={markAttendance}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Mark Attendance
      </button>
    </div>
  );
}