import React from 'react';
 
import EmployeeDashboard from '@/Components/EmployeeDashboard/employee';// Assumes your dashboard is in the same directory folder
 
export const metadata = {
    title: "EmployeeDashboard",
    description: "Secure workspace attendance entry logging system deck.",
};

export default function EmployeePage() {
    return (
        /* 🛡️ Wrap the view screen inside your UserProvider so context distributions mount smoothly */
         <>
            <EmployeeDashboard />
         </>
    );
}