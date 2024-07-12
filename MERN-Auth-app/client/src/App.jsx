import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import DashboardUser from "./components/DashboardUser";
import DashboardAdmin from "./components/DashboardAdmin";
import OpenRoute from "./components/OpenRoute";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/register"
          element={
            <OpenRoute>
              <Register />
            </OpenRoute>
          }
        />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route path="/dashboard/user" element={<DashboardUser />} />

        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
