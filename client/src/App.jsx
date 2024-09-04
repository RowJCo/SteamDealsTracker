import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import SignOutPage from './pages/SignOutPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';


function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/sign-out" element={<SignOutPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
