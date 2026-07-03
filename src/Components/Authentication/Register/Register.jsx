"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function Register() {
    const router = useRouter();
    const [employeeId, setEmployeeId] = useState("");
    const [fullname, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [department, setDepartment] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [upiId, setUpiId] = useState("");
    const [monthlySalary, setMonthlySalary] = useState("");


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/employees/", {
                employeeId,
                fullname,
                gender,
                contactNumber,
                email,
                address,
                joiningDate,
                department,
                bankName,
                accountNumber,
                ifscCode,
                upiId,
                monthlySalary,
            });
            console.log(res.data.data);
            router.push("/AdminDashboard");
        } catch (error) {
            console.error(error);

        } finally {
            console.log("request completed.")
        }
        
    };


    return (
        <div className="flex flex-col bg-[url('https://thf.bing.com/th/id/R.b8a58c167e2b1e0c55c66738555c96ff?rik=pJOT%2f5hfmnxwrw&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f03%2fBeautiful-Nature-wallpaper-background-free.jpg&ehk=y%2bAZIiPuwRq5zjDm6AcPFysoAC7o3qknhfJh3%2bzrbdk%3d&risl=&pid=ImgRaw&r=0')] bg-cover shadow-lg h-screen w-full justify-center items-center">
            <form onSubmit={handleOnSubmit} className=' bg-white h-[90%] max-w bg-center item-center shadow-lg rounded-2xl p-3 bg-cover'>
                <h1 className='font-bold text-3xl items-center text-center p-5'>Registration Form</h1>
                <div className='grid md:grid-cols-1 xl:grid-cols-2 p-4 mt-3 ml-3'>
                    <input type='textarea' placeholder='Enter Your EmployeeId' value={employeeId} onChange={e => setEmployeeId(e.target.value)} required className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='textarea' placeholder='Enter Your Full Name' value={fullname} onChange={e => setFullName(e.target.value)} required className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required className='p-3 hover:bg-gray-300 mb-3 rounded'>
                        <option value="" >Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type='textarea' placeholder='Enter Your Contact Number' value={contactNumber} onChange={e => setContactNumber(e.target.value)} required className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='email' placeholder='Enter Your Email Id' value={email} onChange={e => setEmail(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='textarea' placeholder='Enter Your Address' value={address} onChange={e => setAddress(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='Date' placeholder='Enter Your Joining Data' value={joiningDate} onChange={e => setJoiningDate(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='textarea' placeholder='Enter Your Department' value={department} onChange={e => setDepartment(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='textarea' placeholder='Enter Bank Name' value={bankName} onChange={e => setBankName(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='accountNumber' placeholder='Enter Account Number' value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='textarea' placeholder='Enter Ifsc Code' value={ifscCode} onChange={e => setIfscCode(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='textarea' placeholder='Enter Your Upi ID' value={upiId} onChange={e => setUpiId(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                    <input type='textarea' placeholder='Enter Your Monthly Salary' value={monthlySalary} onChange={e => setMonthlySalary(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />


                </div>

                <div className='flex flex-col justify-center items-center'>
                    <button type="Submit" className='bg-blue-700 rounded mb-3 mt-3 font-bold text-1xl px-4 py-2'>Submit</button>
                    <p>Already have An account {" "}
                        <Link
                            href="/Login"
                            className='text-blue-500 mb-3'>Login Here
                        </Link>
                    </p>

                </div>

            </form>
        </div>
    )
}
