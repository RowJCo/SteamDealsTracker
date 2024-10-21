import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../components/HeaderDash.jsx";
import Footer from "../components/Footer.jsx";
import Content from "../components/Content.jsx";

const fetchGames = async (query) => {
  const response = await fetch(`/api/games/${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  const data = await response.json();
  return data.data;
};

const addToWishlist = async ({ game_id, game_name, buy_price }) => {
  const response = await fetch("/api/user-games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ game_id, game_name, buy_price }),
  });
  if (!response.ok) {
    throw new Error("Failed to add game to wishlist");
  }
  return response.json();
};

const BrowsePage = () => {
  const [query, setQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [buy_price, setBuyPrice] = useState("");
  const queryClient = useQueryClient();

  const {
    data: games,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["games", query],
    queryFn: () => fetchGames(query),
    enabled: !!query,
  });

  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries("usergames");
      setSelectedGame(null);
      setBuyPrice("");
    },
    onError: (error) => {
      console.error("Error adding to wishlist:", error.message);
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query");
    setQuery(query);
  };

  const handleAddToWishlist = (game) => {
    setSelectedGame(game);
  };

  const handleAddToWishlistSubmit = (e) => {
    e.preventDefault();
    if (selectedGame) {
      mutation.mutate({
        game_id: selectedGame.id,
        game_name: selectedGame.name,
        buy_price,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Content>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Browse Games</h1>
          <form onSubmit={handleSearch} className="space-y-4">
            <input
              type="text"
              name="query"
              placeholder="Search for games"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Search
            </button>
          </form>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: {error.message}</div>}
          {Array.isArray(games) && (
            <ul className="space-y-4">
              {games.map((game) => (
                <li key={game.id} className="card bg-base-200 shadow-lg">
                  <div className="card-body">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="card-title">{game.name}</h2>
                      </div>
                      <button
                        onClick={() => handleAddToWishlist(game)}
                        className="btn btn-secondary btn-sm"
                      >
                        Add to Wishlist
                      </button>
                    </div>
                    {selectedGame && selectedGame.id === game.id && (
                      <form
                        onSubmit={handleAddToWishlistSubmit}
                        className="mt-4 space-y-4"
                      >
                        <label className="block">
                          Price you will pay (you must put the price in pence so
                          £1.00 is 100 or £1.50 is 150 etc):
                          <input
                            type="text"
                            name="buy_price"
                            value={buy_price}
                            onChange={(e) => setBuyPrice(e.target.value)}
                            className="input input-bordered w-full mt-2"
                            required
                          />
                        </label>
                        <button
                          type="submit"
                          className="btn btn-primary w-full"
                        >
                          Confirm
                        </button>
                      </form>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Content>
      <Footer />
    </div>
  );
};

export default BrowsePage;
