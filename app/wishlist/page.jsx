import React from "react";
import { getCookieData } from "../../lib/getCookieData";
import { getWishlist } from "../../actions/gameController";

export default async function page() {
  const user = await getCookieData();
  const userGames = await getWishlist();
  return (
    <>
      {user && (
        <>
          <h1 className="text-4xl text-center py-2 font-black">
            This is your wishlist!
          </h1>
          {userGames.success && (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userGames.userGames.map((game) => (
                <li key={game.id} className="card">
                  <h2 className="text-2xl font-black">{game.name}</h2>
                  <p>Price you want to buy it for: {game.buyprice}</p>
                  <p>Current price: {game.price_final_formatted}</p>
                </li>
              ))}
            </ul>
          )}
          {!userGames.success && (
            <h2 className="text-2xl text-center py-2">
              You have no games in your wishlist, go to the browse page to add
              some!
            </h2>
          )}
        </>
      )}
      {!user && (
        <>
          <h1 className="text-4xl text-center py-2 font-black">
            This is the wishlist page, you need to be logged in to view this.
          </h1>
        </>
      )}
    </>
  );
}
