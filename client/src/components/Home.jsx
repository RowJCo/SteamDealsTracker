import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">How to use this website?</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step One:</h2>
          <p className="text-gray-700 text-lg mb-4">
            Sign Up for an account, using the email you want to receive notifications to.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step Two:</h2>
          <p className="text-gray-700 text-lg mb-4">
            Sign In and add games you want with the price you woud pay for them to your list
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step Three:</h2>
          <p className="text-gray-700 text-lg mb-4">
            Wait until you get an email notification that the game you want is available for the price you want
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step Four:</h2>
          <p className="text-gray-700 text-lg mb-4">
            Buy the game and enjoy!
          </p>
      </div>
    </div>
  );
}

export default Home;