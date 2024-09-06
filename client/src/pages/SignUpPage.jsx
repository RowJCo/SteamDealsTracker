//Imports dependencies
import Header from "../components/Header.jsx";
import SignUpForm from "../components/SignUpForm.jsx";
import Footer from "../components/Footer.jsx";


const SignUpPage = () => {
    //renders the sign up page with the header, sign up form and footer components
    return (
        <div>
            <Header />
            <SignUpForm />
            <Footer />
        </div>
    );
}

export default SignUpPage;
