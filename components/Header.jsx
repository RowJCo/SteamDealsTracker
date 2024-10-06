"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl font-black px-2" href="/">
            Steam Deals Tracker
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-2">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
