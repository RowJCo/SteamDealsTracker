import React from "react";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <div className="navbar bg-base-200 fixed top-0 left-0 right-0 z-50 drop-shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Steam Deals Tracker
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/sign-out">Sign Out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderHome;
