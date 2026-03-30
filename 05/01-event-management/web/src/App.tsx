import { BrowserRouter, Routes, Route } from "react-router";

// Page
import LoginPage from "./pages/guest/LoginPage";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import CreateEventPage from "./pages/organizer/CreateEventPage";
import CustomerProfilePage from "./pages/customer/CustomerProfilePage";
import OrganizerProfilePage from "./pages/organizer/OrganizerProfilePage";

// Layout
import RootLayout from "./layouts/RootLayout";
import GuestRoute from "./routes/GuestRoute";

// Route
import AuthRoute from "./routes/AuthRoute";
import CustomerRoute from "./routes/CustomerRoute";
import OrganizerRoute from "./routes/OrganizerRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />

          <Route element={<AuthRoute />}>
            <Route element={<CustomerRoute />}>
              <Route
                path="customer/profile"
                element={<CustomerProfilePage />}
              />
            </Route>
            <Route element={<OrganizerRoute />}>
              <Route
                path="organizer/profile"
                element={<OrganizerProfilePage />}
              />
              <Route
                path="organizer/events/create"
                element={<CreateEventPage />}
              />
            </Route>
          </Route>
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="auth/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
