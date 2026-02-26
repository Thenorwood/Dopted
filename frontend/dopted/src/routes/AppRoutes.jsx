import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

import Home from "../pages/Home";
import Browse from "../pages/Browse";
import PetProfile from "../pages/PetProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />

      <Route
        path="/browse"
        element={
          <AppLayout>
            <Browse />
          </AppLayout>
        }
      />

      <Route
        path="/pets/:id"
        element={
          <AppLayout>
            <PetProfile />
          </AppLayout>
        }
      />

      <Route
        path="/login"
        element={
          <AppLayout>
            <Login />
          </AppLayout>
        }
      />

      <Route
        path="/register"
        element={
          <AppLayout>
            <Register />
          </AppLayout>
        }
      />

      <Route
        path="/about"
        element={
          <AppLayout>
            <About />
          </AppLayout>
        }
      />
    </Routes>
  );
}