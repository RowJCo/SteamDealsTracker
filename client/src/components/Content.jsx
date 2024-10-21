import React from "react";

const Content = ({ children }) => {
  return (
    <main className="flex-grow p-4 w-full mt-16 mb-16 bg-base-100 shadow-inner">
      {children}
    </main>
  );
};

export default Content;
