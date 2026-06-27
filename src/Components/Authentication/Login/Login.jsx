"use client"
import React, { useState,useEffect } from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiService } from '@/Components/context/apiService';
import axios from 'axios';
 
export default function Login() {

  const [employeeType, setEmployeeType] = useState("")
  const[id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const[userDetails, setUserDetails] = useState([])

  const router = useRouter();

  let isAuthentication = false;
  
  //  let isAuthenticated = false;
  // // useEffect(() => {
  // //     fetch("https://dummy.restapiexample.com/api/v1/employees")
  // //     .then((res) => res.json())
  // //     .then((json) => {
  // //       setEmployeeDetails(json.data);
  // //        setDataIsLoaded(true);
  // //     })
  // //   },[])
  // //   if(!dataIsLoaded) {
  // //     return <div><h1 className='text-center font-bold'>please wait some time data is loading</h1></div>
  // //   }
    
  // //   const employee = employeeDetails.find (
  // //     (emp) => 
  // //     emp.id = passwordAsId && emp.employee_age ===email
  // //   );
  // //   if(employee) {
  // //     console.log(employee.employee_name);
  // //     isAuthenticated = true;
  // //   }
  // const getEmployee = async() => {
  //   try{
  //     const res = await apiService.getEmployees();
  //     //console.log("res data is working",res.data);
  //     setEmployeeDetails(res.data.data);
  //      setDataIsLoaded(true);
        
  //   }
  //   catch (error) {
  //     console.error("error message:",error.message);
  //     console.error("error message:",error.response.status);
  //     console.error("error message:",error.response.data);
  //     setDataIsLoaded(true);
  //   }
  // }

  // useEffect (() => {
  //   getEmployee();
  // },[]);
  // if(!dataIsLoaded) {
  //     return <div><h1 className='text-center font-bold'>please wait some time data is loading</h1></div>
  //   }
  // const employee = employeeDetails.find (
  //     (emp) => 
  //     emp.id === Number(passwordAsId) && emp.employee_name ===name
  //   );
  //   if(employee) {
  //     console.log(employee.employee_name);
  //     isAuthenticated = true;
  //   }


  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   if(employee) {
  //     console.log(employee.employee_name);
  //     isAuthenticated = true;
  //   }

  //    console.log(employeeDetails);
  //    console.log("handle onsubmit working");
  //   // let isAuthenticated = userList.some((u) => {
  //   //   if (employeeType == "Admin") {
  //   //     return u.email === email && u.password === password;
  //   //   } else {
  //   //     return u.email === email && (u.password === password ||u.empId === password|| u.id === password);
  //   //   }
  //   // });

    


  //   if (isAuthenticated == true) {
  //     console.log(`Login successful for ${name} as ${employeeType}!`);
      
  //     if (employeeType === "Admin") {
  //       router.push("/AdminDashboard");
  //     }
  //     else {
  //       router.push("/EmployeeDashboard");
  //     }
  //   } else {
  //     alert(
  //       employeeType === "Admin" ? "Invalid admin email or password." :
  //         "invalid credentials for staff/user accounts."
  //     );
    //}
  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/login");
      console.log(res.data);
      setUserDetails(res.data);
    } catch (error) {
      console.error(error);
    }
     const user = userDetails.find (
      (u) => 
      u.email === String(email) && u.password === String(password)
    );
    if(user) {
       
      isAuthentication = true;
    } else {
      alert(`invalid email or password`);
    }
    // if( res.data.email ===String(email) && res.data.password === String(password) && res.data.id === Number(id))  {
    //   isAuthentication = true;
    // } else {
    //    alert ("invalid email or password");
    // }
    if(isAuthentication) {
      if(employeeType === "Admin") {
        router.push("/AdminDashboard");
      }
      else {
        router.push("/EmployeeDashboard");
      }
    }
    
  }
  return (
    <div className="bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-blue-blue-background-sign-in-attendance-wall-image_22083.jpg')] bg-cover bg-center h-screen w-full flex items-center justify-center">

      <form onSubmit={handleOnSubmit} className='flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-lg max-w-sm w-full mx-4'>
        <h1 className='font-bold text-3xl mb-8 text-gray-800'>Login</h1>
        <select
          value={employeeType}
          onChange={(e) => setEmployeeType(e.target.value)} required className='mb-4 p-3 border border-gry-300 rounded bg-white w-full focus:outline-blue-500 text-gray-700 text-sm'>
          <option value="">Select Account Type</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Staff">Staff</option>
        </select>
        <input
          type="textarea"
          placeholder="Enter Your Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          
          className="mb-4 p-3 border border-gray-300 rounded bg-white w-full focus:outline-blue-500 text-gray-800 text-sm"
        />

        <input
          type="current-text"
          placeholder="Enter Your Email Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
          className="mb-4 p-3 border border-gray-300 rounded bg-white w-full focus:outline-blue-500 text-gray-800 text-sm"
        />

        <input
          type="password"
          placeholder={employeeType === "Admin" || !employeeType ? "Enter Password for Admin" : "Enter Password for user & Staff"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 p-3 border border-gray-300 rounded bg-white w-full focus:outline-blue-500 text-gray-800 text-sm font-mono tracking-wide"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-3 rounded font-semibold hover:bg-blue-700 transition duration-200 shadow-md mb-4 text-sm"
        >
          Login
        </button>
        <p className="text-sm text-gray-600 mt-2 text-center" >
          Don't have an account?{" "}
          <Link 
            href="/Register" 
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>

    </div>
  )
}
