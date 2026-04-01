import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [pets, setPets] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL + "/pets";

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (response.ok) {
          setPets(data);
        }
      } catch (error) {
        console.error("Failed to load featured pets:", error);
      }
    };

    getPets();
  }, [API_URL]);

  const featuredPets = pets.slice(0, 3);

  return (
    <>
      <div className="container py-5">
        <div className="text-center bg-white bg-opacity-10 rounded-4 shadow-sm p-4 p-md-5 mx-auto">
          <img
            src="/Dopted.png"
            alt="Dopted Logo"
            className="img-fluid mx-auto mb-4"
            style={{ maxWidth: "360px" }}
          />

          <h1 className="text-black fw-bold display-3 mb-3">
            Dopted!
          </h1>

          <p className="fs-4 text-muted mx-auto mb-3" style={{ maxWidth: "800px" }}>
            Dopted helps connect loving families with pets in need of a safe,
            caring, and permanent home.
          </p>

          <p className="text-secondary mx-auto mb-4" style={{ maxWidth: "720px" }}>
            Browse adoptable pets, explore local shelters and animal resources,
            and take the next step toward giving an animal the home it deserves.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <Link to="/login" className="btn btn-primary btn-lg px-4">
              Login
            </Link>

            <Link to="/register" className="btn btn-outline-primary btn-lg px-4">
              Register
            </Link>

            <Link to="/browse" className="btn btn-success btn-lg px-4 fw-semibold">
              Browse Pets
            </Link>

            <Link to="/adoption" className="btn btn-success btn-lg px-4 fw-semibold">
              Adopt a Pet
            </Link>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Featured Pets</h2>

        <div className="row g-4">
          {featuredPets.map((pet) => (
            <div className="col-12 col-md-6 col-lg-4" key={pet.pet_id}>
              <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${pet.image_url}`}
                  className="card-img-top"
                  alt={pet.breed}
                  style={{ height: "240px", objectFit: "cover" }}
                />

                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">
                    {pet.name}
                  </h5>

                  <p className="text-muted mb-1">
                    {pet.breed}
                  </p>

                  <p className="text-muted mb-3">
                    {pet.location}, {pet.province}
                  </p>

                  <Link
                    to={`/pets/${pet.pet_id}`}
                    className="btn btn-outline-primary btn-sm mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </>
  );
}

export default Home;