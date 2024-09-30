import { create } from "zustand";

//create a store for the user data
export const userStore = create((set) => ({
    // initialise data structures
    signInForm: {
        email: "",
        password: "",
    },
    signUpForm: {
        email: "",
        password: "",
    },
    signedIn: false,
    //sign in a user
    signIn: async (e) => {
        try {
            //prevent the form from submitting
            e.preventDefault();
            //fetch data via the api
            await fetch("/api/sign-in",{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(set.signInForm),
            });
            //set the state
            set({ signedIn: true });
        } catch (error) {
            console.error(error);
        }
    },
    //sign up a user
    signUp: async (e) => {
        try {
            //prevent the form from submitting
            e.preventDefault();
            //fetch data via the api
            await fetch("/api/sign-up",{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(set.signUpForm),
            });
        } catch (error) {
            console.error(error);
        }
    },
    //sign out a user
    signOut: async () => {
        try {
            //fetch data via the api
            await fetch("/api/sign-out",{
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //set the state
            set({ signedIn: false });
        } catch (error) {
            console.error(error);
        }
    },
    deleteUser: async () => {
        try {
            //fetch data via the api
            await fetch("/api/user",{
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //set the state
            set({ signedIn: false });
        } catch (error) {
            console.error(error);
        }
    },
    updateSignInForm: (e) => {
        try {
            //update the state
            set({ signInForm: { ...set.signInForm, [e.target.name]: e.target.value } });
        } catch (error) {
            console.error(error);
        }
    },
    updateSignUpForm: (e) => {
        try {
            //update the state
            set({ signUpForm: { ...set.signUpForm, [e.target.name]: e.target.value } });
        } catch (error) {
            console.error(error);
        }
    },
}));