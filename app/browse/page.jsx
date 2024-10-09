import React from "react";
import { getCookieData } from "../../lib/getCookieData";

export default function page() {
  const user = getCookieData();
  return (
    <>
      {user && (
        <>
          <h1 className="text-4xl text-center py-2 font-black">
            Find the games you want!
          </h1>
        </>
      )}
      {!user && (
        <>
          <h1 className="text-4xl text-center py-2 font-black">
            This is the browse page, you need to be logged in to view this.
          </h1>
        </>
      )}
    </>
  );
}
