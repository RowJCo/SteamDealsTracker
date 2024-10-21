import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/HeaderDash.jsx";
import Footer from "../components/Footer.jsx";
import Content from "../components/Content.jsx";

const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Content>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <div className="flex justify-center space-x-4 my-12">
            <Link to="/browse" className="btn btn-primary">
              Find games
            </Link>
            <Link to="/wishlist" className="btn btn-primary">
              View Wishlist
            </Link>
          </div>
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default DashboardPage;
