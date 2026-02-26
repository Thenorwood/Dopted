import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Browse from "../pages/Browse";
import PetProfile from "../pages/PetProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/pets/:id" element={<PetProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}