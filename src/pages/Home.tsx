// src/pages/Home.tsx
import React from 'react';
import SideBar from "../components/nav-bar/Sidebar";


const Home: React.FC = () => {
    return (
        <div className="flex h-screen">
            <SideBar/>

            {/* Main content */}
            <div className="flex-1 bg-gray-100 p-8">
                <h1 className="text-3xl">Welcome to the Home Page</h1>
                <p className="mt-4">This is the main page of your application.</p>
            </div>
        </div>
    );
};

export default Home;
