import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        password: "",
        websiteUrl: ""
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

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const payload = {
                displayName: formData.displayName,
                email: formData.email,
                password: formData.password,
                websiteUrl: formData.websiteUrl || null
            };

            const response = await axios.post("/UserAccount/register", payload);

            console.log("Register success:", response.data);

            setSuccess("Account created successfully.");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
        catch (err) {
            console.error("Register failed:", err);

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
                setError("Registration failed. Please try again.");
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
                            <h2 className="mb-4 text-center">Create Account</h2>

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
                                    <label htmlFor="displayName" className="form-label">
                                        Name
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
                                    <label htmlFor="email" className="form-label">
                                        Email
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
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="websiteUrl" className="form-label">
                                        Website URL <span className="text-muted">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="websiteUrl"
                                        name="websiteUrl"
                                        value={formData.websiteUrl}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-dark w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Creating account..." : "Register"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}