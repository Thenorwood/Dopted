
import { useEffect, useState } from "react";
import { getPets } from "../api/pets";
import { useNavigate } from "react-router-dom";

export default function Browse() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const apiBase = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const loadPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load pets");
      }
    };

    loadPets();
  }, []);

  const fixApiImageUrl = (url) => {
    if (!url) return "";
    return url.replace("http://example.com", apiBase);
  };

  const buildImageUrl = (pet) => {
    const breedPart = (pet.breed ?? "mixed")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_");

    const agePart = (pet.age_group ?? "adult")
      .toLowerCase()
      .trim();

    return `${apiBase}/images/pets/${breedPart}_${agePart}_1.jpg`;
  };

  const getInitialSrc = (pet) => {
    if (pet.image_url) {
      return `${apiBase}${pet.image_url}`;
    }

    return buildImageUrl(pet);
  };


  //added to filet to show all pets, cats or dogs
  const filteredPets = pets.filter((pet) => {
  if (filter === "all") return true;
  if (filter === "cats") return pet.species?.toLowerCase() === "cat";
  if (filter === "dogs") return pet.species?.toLowerCase() === "dog";
  return true;
});

  return (
    <div className="container py-4">
  <h1 className="mb-4 text-center">Browse Pets</h1>

  <div className="d-flex justify-content-center gap-3 mb-4">
  <button
    className={`btn ${filter === "all" ? "btn-dark" : "btn-outline-dark"}`}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className={`btn ${filter === "cats" ? "btn-dark" : "btn-outline-dark"}`}
    onClick={() => setFilter("cats")}
  >
    Cats
  </button>

  <button
    className={`btn ${filter === "dogs" ? "btn-dark" : "btn-outline-dark"}`}
    onClick={() => setFilter("dogs")}
  >
    Dogs
  </button>
</div>

  {error && <div className="alert alert-danger">{error}</div>}

  <div className="row g-4">
    {filteredPets.map((pet) => (
      <div key={pet.pet_id} className="col-12 col-lg-6">
        <div
          className="card border shadow-sm rounded-4 overflow-hidden"
          style={{ maxWidth: "900px", margin: "0 auto", cursor: "pointer" }}
          role="button"
          
          onClick={() => navigate(`/pets/${pet.pet_id}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate(`/pets/${pet.pet_id}`);
            }
          }}
        >
          <div className="row g-0 align-items-stretch">
            <div className="col-5">
              <img
                src={getInitialSrc(pet)}
                alt={pet.breed}
                className="img-fluid w-100 h-100"
                style={{ height: "240px", objectFit: "cover" }}
                onError={(e) => {
                  const img = e.currentTarget;

                  if (img.dataset.triedPattern !== "1") {
                    img.dataset.triedPattern = "1";
                    img.src = buildImageUrl(pet);
                    return;
                  }

                  if (img.dataset.triedFallback !== "1") {
                    img.dataset.triedFallback = "1";
                    img.src = `${apiBase}/images/pets/mixed_adult_1.jpg`;
                  }
                }}
              />
            </div>

            <div className="col-7">
              <div className="card-body p-4 h-100 d-flex flex-column justify-content-center">
                <h4 className="card-title mb-3">
                  Pet {pet.pet_id} — {pet.breed}
                </h4>

                <div className="card-text">
                  <div className="mb-2">
                    <strong>Age:</strong> {pet.age ?? "Unknown"} ({pet.age_group ?? "?"})
                  </div>
                  <div className="mb-2">
                    <strong>Sex:</strong> {pet.sex ?? "Unknown"}
                  </div>
                  <div className="mb-2">
                    <strong>Location:</strong> {pet.location ?? "Unknown"}
                    {pet.province ? `, ${pet.province}` : ""}
                  </div>
                  <div className="mb-3">
                    <strong>Status:</strong> {pet.adoption_status ?? "Unknown"}
                  </div>
                </div>

                <div className="text-primary fw-semibold mt-auto">
                  View details →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}