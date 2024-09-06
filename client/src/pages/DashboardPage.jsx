//Imports dependencies
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import UserGameDisplay from "../components/UserGameDisplay.jsx";
import UserGameForm from "../components/UserGameForm.jsx";
import RequireAuth from "../components/RequireAuth.jsx";

const DashboardPage = () => {
    //renders the dashboard page with the user game display and user game form components
    return (
        <div>
            <Header />
                <RequireAuth>
                        <UserGameDisplay />
                        <UserGameForm />
                </RequireAuth>
            <Footer />
        </div>
    );
}

export default DashboardPage;
