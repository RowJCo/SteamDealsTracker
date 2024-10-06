import "./global.css";
import Link from "next/link";

export const metadata = {
  title: "Steam Deals Tracker",
  description: "Get the games you want at the price you want!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <header>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <Link className="btn btn-ghost text-xl font-black" href="/">
                Steam Deals Tracker
              </Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
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
        <main className="container mx-auto p-10">{children}</main>
        <footer>
          <footer className="footer bg-neutral text-center text-xs py-5 p-10">
            <p>
              Steam Deals Tracker is a hobby project and is not affiliated with
              Valve or Steam.
            </p>
          </footer>
        </footer>
      </body>
    </html>
  );
}
