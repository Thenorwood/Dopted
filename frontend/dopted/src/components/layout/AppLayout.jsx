import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column">

      <Navbar />

      <main className="flex-fill">
        <Outlet />
      </main>

      <footer className="text-center py-4 border-top">
        © {new Date().getFullYear()} Dopted! — All rights reserved.
      </footer>

    </div>
  );
}