import { create } from "zustand";

//create a store for the game data
export const gameStore = create((set) => ({
    // initialise data structures
    steamGames: [],
    userGames: [],
    update: false,
    createForm: {
        game_id: "",
        game_name: "",
        buyprice: "",
    },
    updateForm: {
        user_game_id: null,
        user_id: null,
        game_id: null,
        game_name: null,
        buyprice: "",
    },
    //fetch all steam games
    fetchSteamGames: async () => {
        try {
            //fetch data via the api
            const response = await fetch("/api/games",{
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //parse the response
            const games = await response.json();
            //set the state
            set({ steamGames: games });
        } catch (error) {
            console.error(error);
        }
    },
    //fetch all user games
    fetchUserGames: async () => {
        try {
            //fetch data via the api
            const response = await fetch("/api/user-games",{
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //parse the response
            const games = await response.json();
            //set the state
            set({ userGames: games });
        } catch (error) {
            console.error(error);
        }
    },
    //add a user game
    addUserGame: async (e) => {
        try {
            //prevent the default form submission
            e.preventDefault();
            //use the game_name to find the game_id
            const findGameId = gameStore.getState().steamGames.find(game => game.game_name === gameStore.getState().createForm.game_name);
            //send data via the api
            const response = await fetch("/api/user-games",{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    game_id: findGameId.game_id,
                    game_name: e.target.game_name.value,
                    buyprice: e.target.buyprice.value,
                }),
            });
            //parse the response
            const games = await response.json();
            //adds the new game to the state
            set((state) => ({ userGames: [...state.userGames, games] }));
        } catch (error) {
            console.error(error);
        }
    },
    //delete a user game
    deleteUserGame: async (user_game_id) => {
        try {
            //send delete request via the api
            await fetch("/api/user-games/"+user_game_id,{
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //remove the game from the state
            set((state) => ({ userGames: state.userGames.filter((game) => game.user_game_id !== user_game_id) }));
        } catch (error) {
            console.error(error);
        }
    },
    //delete all user games of a specific user
    deleteUsersUserGames: async () => {
        try {
            //send delete request via the api
            await fetch("/api/user-games/",{
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //remove all games from the state
            set({ userGames: [] });
        } catch (error) {
            console.error(error);
        }
    },
    //toggle update form
    toggleUpdate: (user_game_id, user_id, game_id, game_name, buyprice) => {
        set({
            //toggle the update state
            update: !gameStore.getState().update,
            //set the update form data
            updateForm: {
                user_game_id: user_game_id,
                user_id: user_id,
                game_id: game_id,
                game_name: game_name,
                buyprice: buyprice,
            },
        });
    },
    updateUserGame: async (e) => {
        try {
            //prevent the default form submission
            e.preventDefault();
            //send put request via the api
            const response = await fetch("/api/user-games/"+gameStore.getState().updateForm.user_game_id,{
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    buyprice: e.target.buyprice.value,
                }),
            });
            //parse the response
            const games = await response.json();
            //update the game in the state
            set((state) => ({
                userGames: state.userGames.map((game) => {
                    if (game.user_game_id === games.user_game_id) {
                        return games;
                    }
                    return game;
                }),
            }));
            //toggle the update state
            set({ update: !gameStore.getState().update });
        } catch (error) {
            console.error(error);
        }
    },
    //update the create form based on user input
    handleCreateFieldChange: (e) => {
        try{
            set((state) => ({
                createForm: {
                    ...state.createForm,
                    [e.target.name]: e.target.value,
                },
            }));
        } catch (error) {
            console.error(error);
        }
    },
    //update the update form based on user input
    handleUpdateFieldChange: (e) => {
        try{
            set((state) => ({
                updateForm: {
                    ...state.updateForm,
                    [e.target.name]: e.target.value,
                },
            }));
        } catch (error) {
            console.error(error);
        }
    },  
}));