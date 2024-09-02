import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center ">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Steam Deals Tracker is a hobby project and in no way affiliated with Valve or Steam.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;