import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../components/HeaderDash.jsx";
import Footer from "../components/Footer.jsx";
import Content from "../components/Content.jsx";

const fetchUserGames = async () => {
  const response = await fetch("/api/user-games", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user games");
  }
  const data = await response.json();
  return data.data;
};

const deleteUserGame = async (userGameId) => {
  const response = await fetch(`/api/user-games/${userGameId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete user game");
  }
  return response.json();
};

const WishlistPage = () => {
  const queryClient = useQueryClient();

  const {
    data: userGames,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["usergames"],
    queryFn: fetchUserGames,
  });

  const mutation = useMutation({
    mutationFn: deleteUserGame,
    onSuccess: () => {
      queryClient.invalidateQueries("usergames");
    },
    onError: (error) => {
      console.error("Error deleting user game:", error.message);
    },
  });

  const handleDelete = (userGameId) => {
    mutation.mutate(userGameId);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(value / 100);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Content>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Your Wishlist</h1>
          {userGames.length === 0 ? (
            <p className="text-lg">Your wishlist is empty.</p>
          ) : (
            <ul className="space-y-4">
              {userGames.map((game) => (
                <li key={game.id} className="card bg-base-200 shadow-lg">
                  <div className="card-body">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="card-title">{game.game_name}</h2>
                        <p className="text-sm text-gray-500">
                          You want to pay: {formatCurrency(game.buy_price)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(game.id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
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

export default WishlistPage;
