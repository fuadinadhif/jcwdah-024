import { BrowserRouter, Routes, Route } from "react-router";

// Page
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

// Layout
import RootLayout from "./layouts/RootLayout";
import GuestRoute from "./routes/GuestRoute";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import OrganizerProfilePage from "./pages/OrganizerProfilePage";

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

          <Route element={<GuestRoute />}>
            <Route path="auth/login" element={<LoginPage />} />
          </Route>

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
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
