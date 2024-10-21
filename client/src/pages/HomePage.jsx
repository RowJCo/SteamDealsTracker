import React from "react";
import Header from "../components/HeaderHome.jsx";
import Footer from "../components/Footer.jsx";
import Content from "../components/Content.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Content>
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Are The Games You Want Never On Sale At A Price You Can Afford?
          </h1>
          <h1 className="text-4xl font-bold">Steam Deals Tracker Can Help!</h1>
        </div>
        <div className="my-12">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
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
                First you need to create an account using the email you would
                like to receive notifications to.
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
                Next you need to browse the steam games for the one that you
                want and click add to wishlist.
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
                Once you have clicked the add to wishlist button a form will
                appear asking you to pick a price you would pay for the game.
                Once you submit this the game will be added to your wishlist.
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
                  Wait for the game to go on sale
                </div>
                Finally you will have to wait until the game goes on sale for
                the price specified where you will then receive an email to
                inform you.
              </div>
              <hr />
            </li>
          </ul>
        </div>
        <div className="text-center">
          <p className="text-2xl mt-4">
            If you are interested,{" "}
            <a href="/sign-up" className="link link-primary">
              sign up
            </a>{" "}
            for an account or{" "}
            <a href="/sign-in" className="link link-primary">
              sign in
            </a>{" "}
            if you already have one.
          </p>
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default HomePage;
