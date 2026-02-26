import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        Dopted
      </Link>

      <div className="flex gap-4">
        <Link to="/browse">Browse</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}