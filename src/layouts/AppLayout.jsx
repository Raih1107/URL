import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
return (
<div className="min-h-screen bg-lavender text-oxford flex flex-col">
    {/* Header */}
    

    {/* Main content */}
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
 
        <Header />
        <Outlet />

    </main>

    {/* Footer */}
    <footer className="p-6 text-center bg-wisteria text-black font-medium shadow-inner rounded-t-xl">
    Made with compassion by Himanshu
    </footer>
</div>
);
};

export default AppLayout;
