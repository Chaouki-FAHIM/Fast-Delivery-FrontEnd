// src/components/nav-bar/Sidebar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const Sidebar: React.FC = () => {
    return (
        <nav className="w-56 bg-gray-800 text-white flex flex-col h-screen">
            <div className="px-6 py-4">
                <h2 className="text-2xl font-bold">Fast Delivery</h2>
            </div>
            <ul className="mt-4 flex-1">
                <li className="py-2 flex items-center hover:bg-gray-700">
                    <HomeIcon className="mr-4" />
                    <Link to="/" className="text-white no-underline flex-1">Home</Link>
                </li>
                <li className="py-2 flex items-center hover:bg-gray-700">
                    <AddShoppingCartIcon className="mr-4" />
                    <Link to="/management-colis" className="text-white no-underline flex-1">Colis</Link>
                </li>
                <li className="py-2 flex items-center hover:bg-gray-700">
                    <LoginIcon className="mr-4" />
                    <Link to="/login" className="text-white no-underline flex-1">Login</Link>
                </li>
                <li className="py-2 flex items-center hover:bg-gray-700">
                    <AppRegistrationIcon className="mr-4" />
                    <Link to="/register" className="text-white no-underline flex-1">Register</Link>
                </li>
                <li className="py-2 flex items-center hover:bg-gray-700">
                    <VpnKeyIcon className="mr-4" />
                    <Link to="/forgot-password" className="text-white no-underline flex-1">Forgot Password</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;