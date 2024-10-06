import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <p className="">
        Is there a game on steam that you want that never seems to be at a price
        you can afford?
      </p>
      <p>Steam Deals Tracker is here to help you!</p>
      <p>Sign up for an account and add the games you want to your wishlist.</p>
      <p>
        Steam Deals Tracker will notify you when the games you want go on sale!
      </p>
      <p className="text-2xl text-center">
        {" "}
        Don't have an account? <strong>Create one</strong>
      </p>
    </>
  );
};

export default page;
