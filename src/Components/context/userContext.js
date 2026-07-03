'use client';
import React,{createContext, useState} from 'react'

export const UserContext = createContext();

export function UserProvider ({children}) {
    const [user, setUser] = useState(null);

    //useState is not used here because next js start from Server-side rendering even we use 'use client'
    //in SSR local storage is not accessible.  

     

    return (
        <UserContext.Provider value={{user, setUser}} >
            {children}
        </UserContext.Provider>
    );
}
