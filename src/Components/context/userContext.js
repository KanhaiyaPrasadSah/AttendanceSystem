'use client';
import React,{createContext, useContext, useState, useEffect} from 'react'

export const UserContext = createContext();

export function UserProvider ({children}) {
    const [userList, setUserList] = useState([]);

    //useState is not used here because next js start from Server-side rendering even we use 'use client'
    //in SSR local storage is not accessible.  

    useEffect(() => {

        const storedData = localStorage.getItem("user");
        if(storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setUserList(Array.isArray(parsed) ? parsed: [parsed]);
            } catch (error) {
                console.error("Error parsing localStorage data:",error);
            }
        }
    },[]);

    return (
        <UserContext.Provider value={{userList}} >
            {children}
        </UserContext.Provider>
    );
}
