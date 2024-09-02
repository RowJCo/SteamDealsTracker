import React from 'react';
import { useState } from 'react';
import gameStore from '../stores/gameStore.js';

const UserGameDisplay = () => {
    const store = gameStore();
    const [initialized, setInitialized] = useState(false);

    if (!initialized) {
        store.fetchUserGames();
        setInitialized(true);
    }
    if (initialized) {
        setTimeout(() => {
            store.fetchUserGames();
        }, 30000);
    }
    return (
        <div className="min-h-75% bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Games you're waiting for</h2>
                <div className="space-y-4">
                    {store.userGames && store.userGames.map((data) => {
                        return (
                            <div key={data.user_game_id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700">Game ID</h3>
                                <p className="text-gray-600">{data.game_id}</p>
                                <h3 className="text-lg font-semibold text-gray-700">Game Name</h3>
                                <p className="text-gray-600">{data.game_name}</p>
                                <h3 className="text-lg font-semibold text-gray-700">Buy Price</h3>
                                <p className="text-gray-600">{data.buyprice}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default UserGameDisplay;