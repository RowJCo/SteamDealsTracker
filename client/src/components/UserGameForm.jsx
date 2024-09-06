//Imports dependencies
import React from 'react';
import { useState } from 'react';
import gameStore from '../stores/gameStore.js';

const UserGameForm = () => {
    const store = gameStore();
    const [initialized, setInitialized] = useState(false);
    const [filteredGames, setFilteredGames] = useState([]);


    //fetches user games and a slice of all games when the component is first mounted so as to reduce lag
    if (!initialized) {
        store.fetchUserGames();
        store.fetchAllGames().then(() => {
            setFilteredGames(store.allGames.slice(0, 500));
        }).catch(error => {
            console.error("Error fetching all games:", error);
        });
        setInitialized(true);
    }

    //if the component has been initialised, fetch the user's games again after 30 seconds
    if (initialized) {
        setTimeout(() => {
            store.fetchUserGames();
        }, 30000);
    }

    //filters the games based on the user's search term
    const handleGameNameChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();// Convert the search term to lowercase
        const filtered = store.allGames.filter(game => game.game_name.toLowerCase().includes(searchTerm)); // Filter the games based on the search term
        setFilteredGames(filtered.slice(0, 500)); // Set the filtered games to the first 500 games to reduce lag
        store.updateCreateFormField(e); // Call the original handler for updating the form field
    };
    
    //renders the form to create or update the games the user is waiting to go on sale
    return (
        <div className=" min-h-50% bg-gray-100 flex flex-col items-center justify-center">
            {store.update === true && (
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Game Price</h2>
                    <form onSubmit={store.updateUserGame} className="space-y-4">
                        <input
                            onChange={store.handleUpdateFieldChange}
                            name="buyprice"
                            value={store.updateForm.buyprice}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter new price, e.g. 500 is £5"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Update Game Price
                        </button>
                    </form>
                </div>
            )}
            {store.update === false && (
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pick Game and Price</h2>
                    <form onSubmit={store.createUserGame} className="space-y-4">
                        <input
                            list="gameList"
                            onChange={handleGameNameChange}
                            name="game_name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                            placeholder="Type a game name"
                        />
                        <datalist id="gameList">
                            {filteredGames.map((game) => (
                                <option key={game.game_id} value={game.game_name} />
                            ))}
                        </datalist>
                        <input
                            onChange={store.updateCreateFormField}
                            name="buyprice"
                            value={store.createForm.buyprice}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter buy price, e.g. 500 is £5"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Game Price Notification
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserGameForm;