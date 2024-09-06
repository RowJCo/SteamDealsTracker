//Imports dependencies
import Header from "../components/Header.jsx";
import SignInForm from "../components/SignInForm.jsx";  
import Footer from "../components/Footer.jsx";

const SignInPage = () => {
    //renders the sign in page with the header, sign in form and footer components
    return (
        <div>
            <Header />
            <SignInForm />
            <Footer />
        </div>
    );
}

export default SignInPage;
