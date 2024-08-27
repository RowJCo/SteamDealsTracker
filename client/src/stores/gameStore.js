import { create } from 'zustand';

const gameStore = create((set) => ({
    allGames: null,
    userGames: null,
    update:false,
    gameName: "",
    createForm: {
        game_id: "",
        buyprice: "",
    },
    updateForm: {
        user_game_id: null,
        user_id: null,
        game_id: "",
        buyprice: "",
    },
    fetchAllGames: async () => {
        try{
            //gets all the games from the server
            const response = await fetch("/api/games");
            const data = await response.json();
            set({ allGames: data });
        } catch (error) {
            console.log("Unable to fetch all games");
        }
    },
    fetchUserGames: async () => {
        try{
            //gets the user games from the server
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
    createUserGame: async (e) => {
        try {
            e.preventDefault();
            //gets the gameName and then uses this to set the game_id in the createForm
            const { gameName, createForm } = gameStore.getState();
            const game = gameStore.getState().allGames.find(game => game.game_name === gameName);
            createForm.game_id = game.game_id;
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
        } catch (error) {
            console.log("Unable to create user game");
        }
    },
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
    toggleUpdate: (user_game_id, user_id, game_id, buyprice) => {
        //toggles the updateForm
        set({ update: !gameStore.getState().update });
        gameStore.setState({ updateForm: { user_game_id, user_id, game_id, buyprice } });
    },
    updateUserGame: async (e) => {
        try {
            e.preventDefault();
            //sends the updateForm to the server
            const { updateForm: { user_game_id, user_id, game_id, buyprice }} = gameStore.getState();
            await fetch("/api/user-games/"+user_game_id, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_game_id, user_id, game_id, buyprice }),
            });
        } catch (error) {
            console.log("Unable to update user game");
        }
    },
    updateCreateFormField: (e) => {
        //updates the createForm
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
