import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById } from "../api/pets";

export default function PetProfile() {
  const { petId } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const apiBase = import.meta.env.VITE_API_BASE_URL;

  const fixApiImageUrl = (url) => {
    if (!url) return "";
    return url.replace("http://example.com", apiBase);
  };

  const buildImageUrl = (p) => {
    const breedPart = (p?.breed ?? "mixed")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_");

    const agePart = (p?.age_group ?? "adult").toLowerCase().trim();

    return `${apiBase}/images/${breedPart}_${agePart}_1.jpg`;
  };

  const getInitialSrc = (p) => {
    const apiSrc = fixApiImageUrl(p?.image_url);
    return apiSrc || buildImageUrl(p);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getPetById(petId);
        setPet(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load pet details");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [petId]);

  const additionalImages = useMemo(() => {
    const list = pet?.additional_images ?? [];
    return list.map(fixApiImageUrl).filter(Boolean);
  }, [pet]);

  return (
    <div className="container py-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="mb-0">Pet Details</h1>

        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {loading && <div className="alert alert-info">Loading...</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && pet && (
        <div className="card shadow-sm">
          <div className="row g-0">
            <div className="col-12 col-md-5">
              <img
                src={getInitialSrc(pet)}
                alt={pet.breed}
                className="img-fluid rounded-start"
                style={{ height: "100%", minHeight: 320, objectFit: "cover" }}
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

            <div className="col-12 col-md-7">
              <div className="card-body">
                <h3 className="card-title mb-2">
                  Pet {pet.pet_id} — {pet.breed ?? "Unknown"}
                </h3>

                <p className="text-muted mb-3">
                  {pet.description ?? "No description provided."}
                </p>

                <div className="row">
                  <div className="col-12 col-sm-6 mb-2">
                    <strong>Species:</strong> {pet.species ?? "Unknown"}
                  </div>
                  <div className="col-12 col-sm-6 mb-2">
                    <strong>Sex:</strong> {pet.sex ?? "Unknown"}
                  </div>
                  <div className="col-12 col-sm-6 mb-2">
                    <strong>Age:</strong> {pet.age ?? "Unknown"} ({pet.age_group ?? "?"})
                  </div>
                  <div className="col-12 col-sm-6 mb-2">
                    <strong>Neutered:</strong>{" "}
                    {typeof pet.neutered_status === "boolean"
                      ? pet.neutered_status
                        ? "Yes"
                        : "No"
                      : "Unknown"}
                  </div>
                  <div className="col-12 col-sm-6 mb-2">
                    <strong>Vaccinated:</strong>{" "}
                    {typeof pet.vaccination_status === "boolean"
                      ? pet.vaccination_status
                        ? "Yes"
                        : "No"
                      : "Unknown"}
                  </div>
                  <div className="col-12 col-sm-6 mb-2">
                    <strong>Health:</strong> {pet.health_status ?? "Unknown"}
                  </div>
                  <div className="col-12 mb-2">
                    <strong>Location:</strong> {pet.location ?? "Unknown"}
                    {pet.province ? `, ${pet.province}` : ""}
                  </div>
                  <div className="col-12 mb-2">
                    <strong>Status:</strong> {pet.adoption_status ?? "Unknown"}
                  </div>
                  <div className="col-12 mb-2">
                    <strong>Adoption fee:</strong>{" "}
                    {pet.adoption_fee != null ? `$${pet.adoption_fee}` : "Unknown"}
                  </div>
                </div>

                {additionalImages.length > 0 && (
                  <>
                    <hr />
                    <h5 className="mb-2">More photos</h5>
                    <div className="row g-2">
                      {additionalImages.map((src, idx) => (
                        <div key={src + idx} className="col-6 col-lg-4">
                          <img
                            src={src}
                            alt={`Pet ${pet.pet_id} additional ${idx + 1}`}
                            className="img-fluid rounded"
                            style={{ height: 110, width: "100%", objectFit: "cover" }}
                            onError={(e) => {
                              e.currentTarget.src = `${apiBase}/images/mixed_adult_1.jpg`;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="card-body text-center d-flex flex-column">
            <Link to="/adoption" className="btn btn-success btn-lg px-4 fw-semibold">
              Adopt a Pet
            </Link>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}