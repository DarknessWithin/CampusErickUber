import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister.jsx";
import DriverLogin from "./pages/driver/DriverLogin.jsx";
import DriverRegister from "./pages/driver/DriverRegister.jsx";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";
import RequestRide from "./pages/customer/RequestRide";
import PendingRides from "./pages/driver/PendingRides";
import DriverRides
    from "./pages/driver/DriverRides";
import RateRide from "./pages/customer/RateRide";
import CustomerRides from "./pages/customer/CustomerRides.jsx";
export default function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/customer/login"
                    element={<CustomerLogin />}

                />
                <Route path="/customer/register" element={<CustomerRegister />} />
                <Route path="/driver/login" element={<DriverLogin />} />
                <Route path="/driver/register" element={<DriverRegister />} />
                <Route
                    path="/customer/dashboard"
                    element={<CustomerDashboard />}
                />

                <Route
                    path="/driver/dashboard"
                    element={<DriverDashboard />}
                />
                <Route
                    path="/customer/request"
                    element={<RequestRide />}
                />
                <Route
                    path="/driver/pending"
                    element={<PendingRides />}
                />
                <Route
                    path="/driver/rides"
                    element={<DriverRides />}
                />
                <Route
                    path="/customer/rides"
                    element={<CustomerRides />}
                />
                <Route
                    path="/customer/rate/:rideId"
                    element={<RateRide />}
                />
            </Routes>

        </BrowserRouter>
    );
}