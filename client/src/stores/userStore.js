import { create } from 'zustand';

const userStore = create((set) => ({
    //initialises the data structures for the user store
    signInForm: {
        email: "",
        password: "",
    },
    signUpForm: {
        email: "",
        password: "",
    },
    signedIn: false,
    //updates the sign in form when the user types in it
    updateSignInForm: (e) => {
        try {
            set((state) => ({ signInForm: { ...state.signInForm, [e.target.name]: e.target.value } }));
        } catch (error) {
            console.log("Unable to update sign in form");
        }
    },
    //updates the sign up form when the user types in it
    updateSignUpForm: (e) => {
        try {
            set((state) => ({ signUpForm: { ...state.signUpForm, [e.target.name]: e.target.value } }));
        } catch (error) {
            console.log("Unable to update sign up form");
        }
    },
    //signs the user in if the details are correct
    signIn: async () => {
        try {
            const { signInForm } = userStore.getState();
            await fetch("/api/sign-in", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInForm),
            });
            if (response.status === 400) {
                throw new Error("Error signing in");
            }
            set({ signedIn: true, signInForm: { email: "", password: "" } });
        } catch (error) {
            console.log("Unable to sign in");
        }
    },
    //signs the user up if the email is not a duplicate
    signUp: async () => {
        try {
            const { signUpForm } = userStore.getState();
            const response = await fetch("/api/sign-up", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpForm),
            });
            //if response status not 201
            if (response.status !== 201) {
                throw new Error("Error signing up, please check your input.");
            }
            set({ signedIn: false, signUpForm: { email: "", password: "" } });
            console.log("Signed up.");
        } catch (error) {
            console.log("Unable to sign up.");
            throw new Error("Error signing up.");
        }
    },
    //signs the user out removing the session cookie
    signOut: async () => {
        try {
            await fetch("/api/sign-out", {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            set({ signedIn: false });
        } catch(error) {
            console.log("Unable to sign out");
            set({ signedIn: false });
        }
    },
    //checks if the user is signed in
    checkAuth: async () => {
        const response = await fetch("/api/check-auth", {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            set({ signedIn: true });
        } else {
            set({ signedIn: false });
        }
    },
    //deletes the user from the database
    deleteUser: async () => {
        try {
            await fetch("/api/del-user", {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            set({ signedIn: false });
        } catch (error) {
            console.log("Unable to delete user");
        }
    },
}));

export default userStore;
