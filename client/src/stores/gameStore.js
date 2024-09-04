import { create } from 'zustand';

const gameStore = create((set) => ({
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
            const { createForm } = gameStore.getState();
            const game = gameStore.getState().allGames.find(game => game.game_name === gameStore.getState().createForm.game_name);            createForm.game_id = game.game_id;
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
            set({ createForm: { game_id: "", game_name:"", buyprice: "" }});
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
    deleteUsersUserGames: async (user_id) => {
        try {
            // Deletes all the user games from the server for a specific user
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

export default gameStore;
