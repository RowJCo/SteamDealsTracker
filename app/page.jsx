import React from "react";
import Link from "next/link";
import { getCookieData } from "../lib/getCookieData";

export default async function page() {
  //get the user data from the cookie
  const user = await getCookieData();
  return (
    <>
      {user && (
        <>
          <h1 className="text-4xl text-center py-2 font-black">
            Welcome back {user.email}!
          </h1>
          <h2 className="text-2xl text-center py-2 px-8">
            You can now start adding games to your wishlist or view your current
            wishlist.
          </h2>
          <ul className="menu menu-horizontal flex justify-center space-x-4">
            <li>
              <Link className="btn btn-primary" href="/browse">
                Browse Games
              </Link>
            </li>
            <li>
              <Link className="btn btn-primary" href="/wishlist">
                View Wishlist
              </Link>
            </li>
          </ul>
        </>
      )}
      {!user && (
        <>
          <h1 className="text-4xl text-center py-2 font-black">
            Is there a game on steam that you want that never seems to be at a
            price you can afford?
          </h1>
          <h2 className="text-2xl text-center py-2 ">
            With Steam Deals Tracker it's simple!
          </h2>
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical py-6">
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">Step 1:</time>
                <div className="text-lg font-black">Create an account</div>
                The first step is to create an account with us using the email
                you would like to receive notifications to. This will include an
                email verification step to ensure that you are the owner of the
                email address.
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic">Step 2:</time>
                <div className="text-lg font-black">Find the game you want</div>
                Look through the catologue of steam games and find the game you
                want. Once you find it, click add to wishlist.
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">Step 3:</time>
                <div className="text-lg font-black">Pick a price</div>
                Once you have added the game to your wishlist, you can set a
                price at which you would like to be notified when the game
                reaches that price.
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic">Step 4:</time>
                <div className="text-lg font-black">
                  Wait for the email notification
                </div>
                Once you have set the price, you can sit back and relax. When
                the game reaches the price you set, you will receive an email
                notification with a link to buy the game on steam.
              </div>
              <hr />
            </li>
          </ul>
          <p className="text-2xl text-center py-8">
            {" "}
            What are you waiting for?{" "}
            <Link href="/signup">
              <strong>Create an account now</strong>
            </Link>
          </p>
        </>
      )}
    </>
  );
}
