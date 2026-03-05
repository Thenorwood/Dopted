/*import { useEffect, useState } from "react";
import { getPets } from "../api/pets";

export default function Browse() {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState("");

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

    const apiBase = import.meta.env.VITE_API_BASE_URL;

    const buildImageUrl = (pet) => {
        // breed: "Golden Retriever" -> "golden_retriever"
        const breedPart = (pet.breed ?? "mixed")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_");

        // age_group should already be like: "adult", "puppy", "kitten"
        const agePart = (pet.age_group ?? "adult").toLowerCase().trim();

        return `${apiBase}/images/${breedPart}_${agePart}_1.jpg`;
    };

    return (
        <div>
            <h1>Browse Pets</h1>

            {error && <p>{error}</p>}

            <ul>
                {pets.map((pet) => (
                    <div key={pet.pet_id} style={{ marginBottom: 20 }}>
                        <img
                            src={buildImageUrl(pet)}
                            alt={pet.breed}
                            style={{ width: 150, height: 150, objectFit: "cover" }}
                             onError={(e) => {
                                if (e.currentTarget.dataset.fallbackApplied === "1") return;

                                e.currentTarget.dataset.fallbackApplied = "1";
                                e.currentTarget.src = `${apiBase}/images/mixed_adult_1.jpg`;
                            }}
                        />

                        <div>
                            <strong>Pet {pet.pet_id}</strong> — {pet.breed}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}
*/
import { useEffect, useState } from "react";
import { getPets } from "../api/pets";
import { useNavigate } from "react-router-dom";

export default function Browse() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

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

    const agePart = (pet.age_group ?? "adult").toLowerCase().trim();

    return `${apiBase}/images/${breedPart}_${agePart}_1.jpg`;
  };

  const getInitialSrc = (pet) => {
    const apiSrc = fixApiImageUrl(pet.image_url);
    return apiSrc || buildImageUrl(pet);
  };

  return (
    <div className="container py-3">
      <h1 className="mb-3">Browse Pets</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3">
        {pets.map((pet) => (
          <div key={pet.pet_id} className="col-12 col-md-6">
            <div
              className="card h-100 shadow-sm"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/pets/${pet.pet_id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/pets/${pet.pet_id}`);
                }
              }}
            >
              <div className="row g-0">
                <div className="col-5">
                  <img
                    src={getInitialSrc(pet)}
                    alt={pet.breed}
                    className="img-fluid rounded-start"
                    style={{ height: 180, width: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      const img = e.currentTarget;

                      if (img.dataset.triedPattern !== "1") {
                        img.dataset.triedPattern = "1";
                        img.src = buildImageUrl(pet);
                        return;
                      }

                      if (img.dataset.triedFallback !== "1") {
                        img.dataset.triedFallback = "1";
                        img.src = `${apiBase}/images/mixed_adult_1.jpg`;
                      }
                    }}
                  />
                </div>

                <div className="col-7">
                  <div className="card-body">
                    <h5 className="card-title mb-2">
                      Pet {pet.pet_id} — {pet.breed}
                    </h5>

                    <div className="card-text small">
                      <div>
                        <strong>Age:</strong> {pet.age ?? "Unknown"} ({pet.age_group ?? "?"})
                      </div>
                      <div>
                        <strong>Sex:</strong> {pet.sex ?? "Unknown"}
                      </div>
                      <div>
                        <strong>Location:</strong> {pet.location ?? "Unknown"}
                        {pet.province ? `, ${pet.province}` : ""}
                      </div>
                      <div>
                        <strong>Status:</strong> {pet.adoption_status ?? "Unknown"}
                      </div>
                    </div>

                    <div className="mt-2 text-primary small">View details →</div>
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