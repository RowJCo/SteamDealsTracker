"use client";

import Link from "next/link";
import { signOut } from "../actions/userController";

export default function Header() {
  return (
    <header>
      <div className="navbar bg-neutral">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl font-black px-2" href="/">
            Steam Deals Tracker
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-2">
            <li>
              <Link className="btn btn-ghost" href="/signin">
                Sign In
              </Link>
            </li>
            <li>
              <Link className="btn btn-ghost" href="/signup">
                Sign Up
              </Link>
            </li>
            <li>
              <form action={signOut} className="btn btn-ghost">
                <button>Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
