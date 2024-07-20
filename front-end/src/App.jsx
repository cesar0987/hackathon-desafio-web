import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "./pages/dashboard/dashboard";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import Itinerary from "./pages/itinerario/itenerario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/itinerario" element={<Itinerary />} />
    </Routes>
  );
}

export default App;
