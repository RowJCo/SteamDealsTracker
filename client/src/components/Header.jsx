//Imports dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
    //renders the header with the logo and links to the dashboard, settings, sign in, sign up and sign out pages
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center ">
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Steam Deals Tracker" width="50" height="50" className="w-12 h-12" />
                        <p className="text-xl font-bold">Steam Deals Tracker</p>
                    </Link>
                </div>
                <nav className="space-x-4">
                    <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
                    <Link to="/settings" className="hover:text-gray-400">Settings</Link>
                    <Link to="/sign-in" className="hover:text-gray-400">Sign In</Link>
                    <Link to="/sign-up" className="hover:text-gray-400">Sign Up</Link>
                    <Link to="/sign-out" className="hover:text-gray-400">Sign Out</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
