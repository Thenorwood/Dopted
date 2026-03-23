import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <img
          src="/Dopted_circle_noName.png"
          alt="Dopted Logo"
          style={{ height: "40px" }}
        />
        <Link to="/" className="navbar-brand fw-bold mb-0">
          Dopted!
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;