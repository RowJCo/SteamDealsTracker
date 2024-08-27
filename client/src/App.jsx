import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import SignInPage from './pages/SignInPage.js';
import SignUpPage from './pages/SignUpPage.js';
import SignOutPage from './pages/SignOutPage.js';
import DashboardPage from './pages/DashboardPage.js';


function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/sign-out" element={<SignOutPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;