//Imports dependencies
import { create } from 'zustand';

const gameStore = create((set) => ({
    //initialises the data structures for the game store
    allGames: [],
    userGames: [],
    update:false,
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
    //fetches all the steam games from the server
    fetchAllGames: async () => {
        try{
            const response = await fetch("/api/games");
            const data = await response.json();
            set({ allGames: data });
        } catch (error) {
            console.log("Unable to fetch all games");
        }
    },
    //fetches the user's games from the server
    fetchUserGames: async () => {
        try{
            const response = await fetch("/api/user-games", {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            set({ userGames: data });
        } catch (error) {
            console.log("Unable to fetch user games");
        }
    },
    //creates a new user game on the server
    createUserGame: async (e) => {
        try {
            e.preventDefault();
            const { createForm } = gameStore.getState();
            //uses the gameName to set the game_id in the createForm
            const game = gameStore.getState().allGames.find(game => game.game_name === gameStore.getState().createForm.game_name);            createForm.game_id = game.game_id;
            //updates the createForm
            set({ createForm });
            //sends the createForm to the server
            await fetch("/api/user-games", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createForm),
            });
            //resets the createForm
            set({ createForm: { game_id: "", game_name:"", buyprice: "" }});
        } catch (error) {
            console.log("Unable to create user game");
        }
    },
    //deletes a user game from the server
    deleteUserGame: async (user_game_id) => {
        try {
            //deletes the user game from the server
            await fetch("/api/user-games/"+user_game_id, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log("Unable to delete user game");
        }
    },
    // deletes all the user games from the server for a specific user
    deleteUsersUserGames: async (user_id) => {
        try {
            await fetch("/api/user-games/",{
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.log("Unable to delete user games for user");
        }
    },
    //toggles the updateForm
    toggleUpdate: (user_game_id, user_id, game_id, game_name, buyprice) => {
        //toggles the updateForm
        set({ update: !gameStore.getState().update,
            updateForm: {
                user_game_id: user_game_id,
                user_id: user_id,
                game_id: game_id,
                game_name: game_name,
                buyprice: buyprice,
            }
         });
    },
    //updates the user game on the server
    updateUserGame: async (e) => {
        try {
            e.preventDefault();
            //sends the updateForm to the server
            const { updateForm: { user_game_id, user_id, game_name, game_id, buyprice }} = gameStore.getState();
            await fetch("/api/user-games/"+user_game_id, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_game_id, user_id, game_id, game_name, buyprice }),
            });
            set({ update: false,
                updateForm: {
                    user_game_id: null,
                    user_id: null,
                    game_id: null,
                    game_name: null,
                    buyprice: "",
                }
             });
        } catch (error) {
            console.log("Unable to update user game");
        }
    },
    //updates the createForm to be whatever the user types in the input field
    updateCreateFormField: (e) => {
        try {
            const { createForm } = gameStore.getState();
            set({ 
                createForm: { 
                    ...createForm, 
                    [e.target.name]: e.target.value 
                } 
            });
        } catch (error) {
            console.log("Unable to update create form field");
        }
    },
    //updates the updateForm to be whatever the user types in the input field
    handleUpdateFieldChange: (e) => {
        //updates the updateForm
        try {
            const { updateForm } = gameStore.getState();
            set({ 
                updateForm: { 
                    ...updateForm, 
                    [e.target.name]: e.target.value 
                } 
            });
        } catch (error) {
            console.log("Unable to update update form field");
        }
    },
}));

export default gameStore;
