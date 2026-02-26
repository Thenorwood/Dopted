import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Dopted
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition">
            Home
          </Link>
          <Link to="/browse" className="text-gray-700 hover:text-purple-600 transition">
            Browse
          </Link>
          <a href="#about" className="text-gray-700 hover:text-purple-600 transition">
            About
          </a>
        </div>

        {/* CTA Button */}
        <Link
          to="/browse"
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Adopt Now
        </Link>

      </div>
    </nav>
  );
}