import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/dashboard/dashboard";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<RegisterPage />} />
      
    </Routes>
   
  );
}

export default App;
