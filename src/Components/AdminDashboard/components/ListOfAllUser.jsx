"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListOfAllUser() {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("Absent");
  const [overtimeHours, setOvertimeHours] = useState(0);
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
      console.log(res.data);
      setEmployees(res.data);

      // setAttendance(
      //   res.data.map((emp) => ({
      //     employee: emp._id,
      //     status: "Present",
      //     overtimeHours: 0,
      //   }))
      // );
    } catch (err) {
      console.error(err);
    }
  };

  // const handleStatus = (index, value) => {
  //   setAttendance((prev) =>
  //     prev.map((item, i) =>
  //       i === index ? { ...item, status: value } : item
  //     )
  //   );
  // };

  // const handleOvertime = (index, value) => {
  //   setAttendance((prev) =>
  //     prev.map((item, i) =>
  //       i === index
  //         ? { ...item, overtimeHours: Number(value) }
  //         : item
  //     )
  //   );
  // };

  const markAttendance = async () => {
    try {
      const payload =  {
        employee: employees.map(emp => emp._id),
        date:date,
        status: status,
        overtimeHours: overtimeHours,
      }

      console.log("Sending Payload:");
      console.log(payload);

      const res = await axios.post(
        "http://localhost:5000/api/attendance/bulk",

        // If your backend expects { attendance: payload }
        // replace payload with { attendance: payload }

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
        err.response?.data?.message || "Unable to mark attendance"
      );
    }
  };

  return (
    <div className="p-6">

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
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="border rounded p-1 w-full"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
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
                  value={overtimeHours}
                  onChange={(e) => setOvertimeHours(e.target.value)}
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