import { Link, Outlet } from "react-router-dom";
import React from "react";

 function Navbar() {
  return (
    <div className="d-flex flex-column min-vh-100">

   
     <nav className="navbar navbar-dark bg-dark px-4 py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">

      <img src="dopted_logo.png" alt="Dopted Logo" className="w-8 h-8 mr-2" />
      <Link to="/" className="font-bold text-lg">
        Dopted!
      </Link>
      </div>
    </nav>

    <main className="flex-fill">
    <Outlet />
    </main>

    <footer className="bg-gray-200 text-center py-4 mt-auto">
        © {new Date().getFullYear()} Dopted! — All rights reserved.
    </footer>

     </div>
  );
}
export default Navbar;