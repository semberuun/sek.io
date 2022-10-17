import React from 'react';
import AdminBoard from '../Components/AdminBoard';
import AdminDashboard from '../Components/AdminDashboard';

function Admin() {
    return (
        <div className=' w-full bg-gray-50 md:flex md:justify-between pb-10'>
            <AdminBoard />
            <AdminDashboard />
        </div>
    )
}

export default Admin