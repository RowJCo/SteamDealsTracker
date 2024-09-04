import { useState } from 'react'; // Add this line

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import userStore from "../stores/userStore.js";

const SignOutPage = () => {
    const store = userStore();
    const [initialized, setInitialized] = useState(false);

    if (!initialized) {
        store.signOut();
        setInitialized(true);
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-xl font-semibold text-gray-800">You are now logged out</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignOutPage;
