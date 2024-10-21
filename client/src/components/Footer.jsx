import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-4">
      <aside>
        <p>
          Steam Deals Tracker is a hobby project and is not affiliated with or
          endorsed by Valve Corporation.
        </p>
        <p>
          You can view the code on{" "}
          <a
            href="https://github.com/RowJCo/SteamDealsTracker"
            className="link link-primary"
          >
            GitHub
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
