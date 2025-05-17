// src/App.js
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import Home from "./pages/Home";
import Login from "./components/admin/login/login";
import AdminDashboard from "./components/admin/pagesAdmin/AdminDashboard";
import Footer from "./components/user/Footer";

function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");

  const hideNavbarFooter =
    location.pathname.startsWith(process.env.WEB_SIE1_ADMIN_ROUTE) ||
    location.pathname === "/login";

  return (
    <div className="App">
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Route Admin (Protected) */}
        <Route
          path={`${process.env.WEB_SIE1_ADMIN_ROUTE}/*`} // Perhatikan /*
          element={
            isLoggedIn && userType === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
