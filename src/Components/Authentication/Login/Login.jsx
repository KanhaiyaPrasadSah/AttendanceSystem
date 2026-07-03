"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '@/Components/context/userContext';
export default function Login() {
  const { setUser } = useContext(UserContext);

  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.password.value);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: e.target.name.value.trim(),
        password: e.target.password.value.trim(),
      });
      console.log(res.data);
      const { token } = res.data;

      localStorage.setItem("token", token);
      console.log(token);


      router.push("/AdminDashboard");

      // setUser ({

      // })
      // // setUser({
      // //   id: user.id,
      // //   email: user.email,
      // //   name: user.name,
      // //   phoneNumber: user.phoneNumber,
      // //   address: user.address,
      // //   password: user.password,
      // //   userType: user.userType,
      // //   status: user.status,
      // //   leaveRequest: user.leaveRequest,
      // //   imageUrl: user.imageUrl
      // // });


      //   router.push("/EmployeeDashboard");


      //  if (name === "admin" && password === "asdf1234") {
      //   setUser({
      //     email: email,
      //     password: password
      //   });

      //   router.push("/AdminDashboard");
      // }
      // else {
      //   alert(`invalid email or password`);
      // }
    } catch (error) {
  if (error.response) {
    toast.error(error.response.data.message);
    alert("invalid email or password");
  } else {
    toast.error("Network error. Please try again.");
  }
}

  }
  return (
    <div className="bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-blue-blue-background-sign-in-attendance-wall-image_22083.jpg')] bg-cover bg-center h-screen w-full flex items-center justify-center">

      <form onSubmit={handleOnSubmit} className='flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-lg max-w-sm w-full mx-4'>
        <h1 className='font-bold text-3xl mb-8 text-gray-800'>Login</h1>

        <input
          name="name"
          type="text"
          placeholder="Enter Your Name"


          className="mb-4 p-3 border border-gray-300 rounded bg-white w-full focus:outline-blue-500 text-gray-800 text-sm"
        />



        <input
          name="password"
          type="password"
          placeholder="Enter Your Password"

          required
          className="mb-6 p-3 border border-gray-300 rounded bg-white w-full focus:outline-blue-500 text-gray-800 text-sm font-mono tracking-wide"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-3 rounded font-semibold hover:bg-blue-700 transition duration-200 shadow-md mb-4 text-sm"
        >
          Login
        </button>
        {/* <p className="text-sm text-gray-600 mt-2 text-center" >
          Don't have an account?{" "}
          <Link
            href="/Register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p> */}
      </form>

    </div>
  )
}
