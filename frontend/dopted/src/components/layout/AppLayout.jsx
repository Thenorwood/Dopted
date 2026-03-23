import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundImage: "url('/background_Img_Dopted.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >

      <Navbar />

      <main className="flex-fill container py-4">
        <Outlet />
      </main>

      <footer className="bg-primary text-white text-center py-4 mt-auto">
        © {new Date().getFullYear()} Dopted! — All rights reserved.
      </footer>

    </div>
  );
}