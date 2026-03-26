import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="position-relative">

      {/* SOLID BLUE AREA */}
      <div style={{ backgroundColor: "rgb(13, 110, 253)" }}>
        <div className="container-fluid px-4 pt-3 pb-2" style={{ height: "90px", overflow: "visible" }}>
          <img
            src="/dopted_logo.png"
            alt="Dopted Logo"
            style={{ height: "170px", marginTop: "-30px" }}
          />
        </div>

        <div className="container d-flex justify-content-center gap-5 pb-4 pt-2">

  <NavLink
    to="/"
    className={({ isActive }) =>
      "nav-link text-white fw-semibold fs-5" +
      (isActive ? " active text-warning" : "")
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/browse"
    className={({ isActive }) =>
      "nav-link text-white fw-semibold fs-5" +
      (isActive ? " active text-warning" : "")
    }
  >
    Browse Pets
  </NavLink>

  <NavLink
    to="/shelters"
    className={({ isActive }) =>
      "nav-link text-white fw-semibold fs-5" +
      (isActive ? " active text-warning" : "")
    }
  >
    Shelters
  </NavLink>

  <NavLink
    to="/about"
    className={({ isActive }) =>
      "nav-link text-white fw-semibold fs-5" +
      (isActive ? " active text-warning" : "")
    }
  >
    About
  </NavLink>

</div>
      </div>

      {/* ACTUAL FADE */}
      <div
        style={{
          height: "70px",
          background: "linear-gradient(to bottom, rgba(13,110,253,1) 0%, rgba(13,110,253,0.75) 35%, rgba(13,110,253,0.25) 75%, rgba(13,110,253,0) 100%)"
        }}
      />
    </header>
  );
}

export default Navbar;