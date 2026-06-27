import React from 'react';

import AdminDashboard from '@/Components/AdminDashboard/AdminDashboard';// Mounts your newly refactored modular grid template component

export const metadata = {
    title: "AdminDashboard",
    description: "Enterprise operational overview deck, roster configuration tool, and attendance log stream tracker.",
};

export default function AdminDashboardPage() {
    return (
        /* 🛡️ Wrap the administrative dashboard view inside your UserProvider so data syncing executes seamlessly */
        <AdminDashboard />
    );
}