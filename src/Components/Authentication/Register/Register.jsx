"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { apiService } from '@/Components/context/apiService';
import axios from 'axios';


export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");
    const [employeeDetails, setEmployeeDetails] = useState([])
    const [dataIsLoaded, setDataIsLoaded] = useState(false)
    const [password, setPassword] = useState("")
    // const handleOnSubmit= (e) => {
    //     e.preventDefault();
    //     console.log("handle on submit working");
    //     const storedUserData = localStorage.getItem("user")
    //     if(storedUserData) {
    //         const userData = JSON.parse(storedUserData)
    //         if(userData.email === email && userData.password === password) {
    //             alert(`user already exists`)
    //             return;
    //         }
    //     }

    //     const details = {
    //         employeeType: "Admin",
    //         empId,
    //         name,
    //         email,
    //         phoneNumber,
    //         address,
    //         password
    //     }
    //     localStorage.setItem("user",JSON.stringify(details));

    //     const storedData = localStorage.getItem("user")
    //     console.log(storedData);

    //     router.push("/AdminDashboard")
    // const handleOnSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("button is working");
    // const handleOnSubmit =(e)  =>  async () => {
    //         e.preventDefault();
    //        console.log("under submit function is working ");
    //     let response = await fetch('https://dummy.restapiexample.com/api/v1/create', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             name: name,
    //             salary: phoneNumber,
    //             age: empId,
    //             id: password
    //         }),
    //         headers: {
    //             'status' : 'success'
    //         }

    //     })
    //     response = await response.json()
    //     alert(JSON.stringify(response))
    //     console.log("it's working");
    // }
    
    const handleOnSubmit = async(e) => {
        e.preventDefault();

         
        try {
            const res = await axios.post("https://6a3cb81cd8e212699e22a82b.mockapi.io/api/v1/register", {
                name,
                email,
                phoneNumber,
                id,
                address,
                password
            });
            console.log(res);
            // const res = await apiService.writeUser({
            //     name,
            //     email,
            //     phoneNumber,
            //     id,
            //     address,
            //     password
            // });
            // console.log(res);
             
            console.log("add user is working");
        } catch (error) {
            console.error(error);
             
        } finally {
            console.log("request completed.")
        }
    
         
        router.push("/AdminDashboard");
    };


    return (
        <div className="flex flex-col bg-[url('https://thf.bing.com/th/id/R.b8a58c167e2b1e0c55c66738555c96ff?rik=pJOT%2f5hfmnxwrw&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f03%2fBeautiful-Nature-wallpaper-background-free.jpg&ehk=y%2bAZIiPuwRq5zjDm6AcPFysoAC7o3qknhfJh3%2bzrbdk%3d&risl=&pid=ImgRaw&r=0')] bg-cover shadow-lg h-screen w-full justify-center items-center">
            <form onSubmit={handleOnSubmit} className='bg-white h-[80%] max-w-sm bg-center flex flex-col item-center shadow-lg rounded-2xl p-3 bg-cover'>
                <h1 className='font-bold text-3xl items-center text-center p-5'>Admin Registration</h1>
                <input type='textarea' placeholder='Enter Your Name' value={name} onChange={e => setName(e.target.value)} required className='p-3 hover:bg-gray-300 mb-3 rounded' />
                <input type='email' placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)} required className='p-3 hover:bg-gray-300 mb-3 rounded' />
                <input type='Number' placeholder='Enter your Phone Number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required className='p-3 hover:bg-gray-300 mb-3 rounded' />
                <input type='textarea' placeholder='Enter Your ID' value={id} onChange={e => setId(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                <input type='textarea' placeholder='Enter Your Address' value={address} onChange={e => setAddress(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />
                <input type='Password' placeholder='Enter Your Password' value={password} onChange={e => setPassword(e.target.value)} className='p-3 hover:bg-gray-300 mb-3 rounded' />

                <button type="Submit" className='bg-blue-700 rounded mb-3 mt-3 font-bold text-1xl'>Submit</button>
                <p>Already have An account {" "}
                    <Link
                        href="/Login"
                        className='text-blue-500 mb-3'>Login Here
                    </Link>

                </p>
            </form>
        </div>
    )
}
