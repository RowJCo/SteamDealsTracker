import userStore from '../stores/userStore.js';
import { useState } from 'react';

const RequireAuth = (props) => {
    const store = userStore();
    const [initialized, setInitialized] = useState(false);

    if (!initialized) {
        // checkAuth when the component is first mounted
        store.checkAuth();
        setInitialized(true);
    }

    if (initialized && store.signedIn === false) {
        // wait 30 seconds and checkAuth again to see if the user has signed in since the component was mounted
        setTimeout(() => {
            store.checkAuth();
        }, 30000);
    }

    // if the user is signed in, render the children
    if (store.signedIn && store.signedIn === true) {
        return (
            <div>
                {props.children}
            </div>
        );
    }

    // else render a message telling the user they must be signed in
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
                <p className="text-gray-700 mb-4">You must be logged in to view this page.</p>
            </div>
        </div>
    );
};

export default RequireAuth;