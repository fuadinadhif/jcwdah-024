import { BrowserRouter, Routes, Route } from "react-router";

import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={} />
        <Route path="/auth/register" element={} /> */}
        <Route path="/auth/login" element={<LoginPage />} />
        {/* <Route path="/profile/customer" element={} />
        <Route path="/profile/organizer" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}
