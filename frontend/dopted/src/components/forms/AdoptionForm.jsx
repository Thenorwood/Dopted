import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const AdoptionForm = () => {
const navigate = useNavigate();

    const [formData, setFormData] = useState({
      petId: "",
      petName: "",
      adopterName: "",
      adopterEmail: "",
      adopterPhone: "",
      message: "",
      status: "Pending",
      submittedAt:"",
     
    });

    const [error, setError]     = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", formData);

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const payload = {
                petId: Number(formData.petId),
                petName: formData.petName,
                adopterName: formData.adopterName,
                adopterEmail: formData.adopterEmail,
                adopterPhone: formData.adopterPhone,
                message: formData.message,
                status: formData.status,
                submittedAt: new Date().toISOString(),
               
            };

            const response = await axios.post("/UserAccount/adoption-requests", payload);

            console.log("Adoption success:", response.data);

            setSuccess("Adoption request submitted successfully.");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
        catch (err) {
            console.error("Adoption failed:", err);

            if (err.response?.data?.error) {
                setError(err.response.data.error);
            }
            else if (err.response?.data?.message) {
                setError(err.response.data.message);
            }
            else if (typeof err.response?.data === "string") {
                setError(err.response.data);
            }
            else {
                setError("Adoption application failed. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="mb-4 text-center">Adoption Form</h2>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="hidden"
                                        name="petId"
                                        value={formData.petId}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="submittedAt" className="form-label">
                                        Date:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="submittedAt"
                                        name="submittedAt"
                                        value={formData.submittedAt}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="petName" className="form-label">
                                        Name of the dog I wish to adopt:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="petName"
                                        name="petName"
                                        value={formData.petName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="adopterName" className="form-label">
                                        Adopter Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="adopterName"
                                        name="adopterName"
                                        value={formData.adopterName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="adopterEmail" className="form-label">
                                        Adopter Email:
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="adopterEmail"
                                        name="adopterEmail"
                                        value={formData.adopterEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="adopterPhone" className="form-label">
                                        Adopter Phone Number:
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="adopterPhone"
                                        name="adopterPhone"
                                        value={formData.adopterPhone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">
                                        Why do you want to adopt this dog?
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Status:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value="Pending"
                                        disabled
                                    />
                                    <small className="text-muted">
                                        Your adoption request will be reviewed by the shelter.
                                    </small>
                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-dark w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting form..." : "Adopt"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
        
    </div>
    );
}
export default AdoptionForm;