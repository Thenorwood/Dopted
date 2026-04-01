import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const AdoptionForm = () => {
const navigate = useNavigate();

    const [formData, setFormData] = useState({
        isAdult: "",
        date: "",
        location: "",
        displayDogName: "",
        displayName: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        phone: "",
        email: "",
        emergencyContactName: "",
        emergencyContactPhone: ""
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
                isAdult: formData.isAdult,
                date: formData.date,
                location: formData.location,
                displayDogName: formData.displayDogName,
                displayName: formData.displayName,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                province: formData.province,
                postalCode: formData.postalCode,
                phone: formData.phone,
                emergencyContactName: formData.emergencyContactName,
                emergencyContactPhone: formData.emergencyContactPhone
            };

            const response = await axios.post("/UserAccount/adoption", payload);

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
                                    <label htmlFor="yes" className="form-label">
                                        I agree that I am an adult (18 years or older):
                                    </label>
                                <div className="from-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="yes"
                                        name="isAdult"
                                        value="yes"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="yes" className="form-label">Yes</label>
                                    
                                </div>

                                <div className="from-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="no"
                                        name="isAdult"
                                        value="no"
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="no" className="form-label">No</label>
                                </div>
                            </div>

                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">
                                        Date:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">
                                        I wish to adopt from the following location:
                                    </label>
                                    <select name="location" defaultValue={formData.location}>
                                        <option value="">Select a location</option>
                                        <option value="PEI">PEI</option>
                                        <option value="NewBrunswick">New Brunswick</option>
                                        <option value="NovaScotia">Nova Scotia</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="displayDogName" className="form-label">
                                        Name of the dog I wish to adopt:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="displayDogName"
                                        name="displayDogName"
                                        value={formData.displayDogName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="displayName" className="form-label">
                                        Full Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="displayName"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        Address:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                    
                                <div className="row">
                                    <div className="col-md-4">
                                    <label className="form-label">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="City"
                                        value={formData.City}
                                        onChange={handleChange}
                                        required
                                    />
                                    </div>
                                <div className="col-md-4">
                                        <label className="form-label">Province</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="Province"
                                            value={formData.Province}
                                            onChange={handleChange}
                                            required
                                        />
                                        </div>

                                        <div className="col-md-4">
                                        <label className="form-label">Postal</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="PostalCode"
                                            value={formData.PostalCode}
                                            onChange={handleChange}
                                            required
                                        />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Phone Number:
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emergencyContactName" className="form-label">
                                        Please list the name of someone who is your emergency contact for the microchip registration file. They will be added as a back up to your microchip contacts in addition to any contact numbers listed above, this should not be someone who lives in the home with you.
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="emergencyContactName"
                                        name="emergencyContactName"
                                        value={formData.emergencyContactName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emergencyContactPhone" className="form-label">
                                        Emergency Contact Phone:
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="emergencyContactPhone"
                                        name="emergencyContactPhone"
                                        value={formData.emergencyContactPhone}
                                        onChange={handleChange}
                                        required
                                    />
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