//Imports dependencies
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import gameStore from '../stores/gameStore.js';
import userStore from '../stores/userStore.js';

const SettingsPage = () => {

  const storeOne = gameStore();
  const storeTwo = userStore();

  //a function that runs a series of functions to delete the user account and any user games associated with it
  const handleDeleteAccount = async () => {
    try {
        storeOne.deleteUsersUserGames();
        storeTwo.deleteUser();
        storeTwo.signOut();
    } catch (error) {
        console.error("Error deleting user account and games:", error);
    }
  };

  //renders the settings page with the header , fotoer and a button to delete the user account
  return (
    <div>
      <Header />
      <RequireAuth>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Account Settings</h2>
            <div className="flex justify-center">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </RequireAuth>
      <Footer />
    </div>
  );
};

export default SettingsPage;
