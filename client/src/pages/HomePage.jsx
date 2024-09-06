//Imports dependencies
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Home from "../components/Home.jsx";

const HomePage = () => {
    //renders the home page with the header, home and footer components
    return (
        <div>
            <Header />
            < Home />
            <Footer />
        </div>
    );
}

export default HomePage;
