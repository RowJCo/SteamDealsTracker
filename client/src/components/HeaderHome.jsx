import React from "react";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <header className="navbar bg-base-200 fixed top-0 left-0 right-0 z-50 drop-shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Steam Deals Tracker
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HeaderHome;
