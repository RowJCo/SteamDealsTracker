import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <h1 className="text-4xl text-center py-2 font-black">
        Is there a game on steam that you want that never seems to be at a price
        you can afford?
      </h1>
      <h2 className="text-2xl text-center py-2 ">
        With Steam Deals Tracker it's simple!
      </h2>
      <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-start mb-10 md:text-end">
            <time class="font-mono italic">Step 1:</time>
            <div class="text-lg font-black">Create an account</div>
            The first step is to create an account with us using the email you
            would like to receive notifications to. This will include an email
            verification step to ensure that you are the owner of the email
            address.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-end mb-10">
            <time class="font-mono italic">Step 2:</time>
            <div class="text-lg font-black">Find the game you want</div>
            Look through the catologue of steam games and find the game you
            want. Once you find it, click add to wishlist.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-start mb-10 md:text-end">
            <time class="font-mono italic">Step 3:</time>
            <div class="text-lg font-black">Pick a price</div>
            Once you have added the game to your wishlist, you can set a price
            at which you would like to be notified when the game reaches that
            price.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-end mb-10">
            <time class="font-mono italic">Step 4:</time>
            <div class="text-lg font-black">
              Wait for the email notification
            </div>
            Once you have set the price, you can sit back and relax. When the
            game reaches the price you set, you will receive an email
            notification with a link to buy the game on steam.
          </div>
          <hr />
        </li>
      </ul>
      <p className="text-2xl text-center py-2">
        {" "}
        Don't have an account?{" "}
        <Link href="/signup">
          <strong>Create one</strong>
        </Link>
      </p>
    </>
  );
}
