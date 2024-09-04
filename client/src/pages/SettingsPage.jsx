import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import RequireAuth from "../components/RequireAuth.jsx";

const SettingsPage = () => {
  return(
    <div>
      <Header />
      <RequireAuth>
        <div>
          
        </div>
      </RequireAuth>
      <Footer />
    </div>
  )
}

export default SettingsPage;
