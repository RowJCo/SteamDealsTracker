import { create } from 'zustand';

const userStore = create((set) => ({
    signInForm: {
        email: "",
        password: "",
    },
    signUpForm: {
        email: "",
        password: "",
    },
    updateSignInForm: (e) => {
        try {
            set((state) => ({ signInForm: { ...state.signInForm, [e.target.name]: e.target.value } }));
        } catch (error) {
            console.log("Unable to update sign in form");
        }
    },
    updateSignUpForm: (e) => {
        try {
            set((state) => ({ signUpForm: { ...state.signUpForm, [e.target.name]: e.target.value } }));
        } catch (error) {
            console.log("Unable to update sign up form");
        }
    },
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
            set({ signedIn: true, signInForm: { email: "", password: "" } });
        } catch (error) {
            console.log("Unable to sign in");
        }
    },
    signUp: async () => {
        try {
            const { signUpForm } = userStore.getState();
            await fetch("/api/sign-up", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpForm),
            });
            set({ signedIn: false, signUpForm: { email: "", password: "" } });
        } catch (error) {
            console.log("Unable to sign up");
        }
    },
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
}));

export default userStore;