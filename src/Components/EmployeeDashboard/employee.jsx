"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { UserContext } from '../context/userContext'
import { useRouter } from 'next/navigation'
export default function employee() {

  const [checkedIn, setCheckedIn] = useState("");
  const [status, setStatus] = useState("");
  const now = new Date();
  const todaysDate = now.toLocaleDateString("es-US", { year: "numeric", month: "long", day: "numeric" });
  let activeEmployee = false;


  useEffect(() => {
    let storedData = localStorage.getItem("attendanceSheet");
    if (storedData) {
     storedData = JSON.parse(storedData);
      if (storedData.todaysDate === todaysDate  ) {
        activeEmployee = true;
      }
    }

    if (activeEmployee) {
      setCheckedIn("true");
      setStatus("present");
    }
    else {
      setCheckedIn("false");
      setStatus("Absent");
    }
  }, [])

  const handleOnMarkedAttendance = (e) => {
    e.preventDefault();
     
    if(status === "Absent") {
      console.log("marked attendance.");
      let userdetails = localStorage.getItem("user")
      userdetails = JSON.parse(userdetails)
      console.log(userdetails)
      let empId = userdetails.empId;
      let updatedDetails = {
        todaysDate,
        empId
      }
      localStorage.setItem("attendanceSheet",JSON.stringify(updatedDetails));
       setStatus("Present");
    }
      
    else {
      console.log(`already marked`);
    }
  }
  return (
    <>
      <div className='flex object-bottom-right'>
        <Link
        href ="/Login"
        className='bg-red-500 font-bold'> LogOut
        </Link>
      </div>

      <div className=' flex flex-col items-center bg-center'>

      <form onSubmit={handleOnMarkedAttendance} className='flex flex-col bg-blue-300 h-[80%] w=auto mt-60 mb-60 p-5 bg-cover rounded-3xl bg-center'>
        <h1 className='text-3xl font-bold'>Mark Your Attendance</h1>
        <p >Clicking the below button will mark your attendance.</p>
        <button type="Submit" className='bg-blue-700 flex flex-col mt-3 rounded-4xl'>Click to Mark Attendance</button>
        <p className='flex flex-col item-center text-center'>Status: {status}</p>
      </form>
    </div>
    </>
    
  )
}
