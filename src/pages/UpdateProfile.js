import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Register.css"; // Reuse existing styling

const UpdateProfile = () => {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    teamID: "",
    githubUsername: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    if (savedUser) {
      // Pre-fill form with user data
      setFormData({
        name: savedUser.name || "",
        email: savedUser.email || "",
        experience: savedUser.experience || "",
        teamID: savedUser.teamID || "",
        githubUsername: savedUser.githubUsername || ""
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setLoading(true);

    try {
      const apiUrl = 'https://summeropenreg-esbcg8bgekgrabfu.canadacentral-01.azurewebsites.net/api/Registrations';

      const response = await fetch(apiUrl, {
        method: 'PUT', // Use PUT for updates
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to update profile. Please try again.");
      }

      localStorage.setItem("registeredUser", JSON.stringify(formData));
      setSubmitSuccess("Profile updated successfully!");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-content">
          <h1 className="register-title">Update Your Profile</h1>

          {submitError && <div className="error-message">{submitError}</div>}
          {submitSuccess && (
            <div className="success-message" style={{ backgroundColor: "#e0ffe0", padding: "10px", borderRadius: "5px", color: "#228822", marginBottom: "10px" }}>
              {submitSuccess}
            </div>
          )}

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly // Don't allow changing email
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience" className="form-label">Experience Level</label>
              <select
                className="form-select"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3+ years)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="teamID" className="form-label">Team ID</label>
              <input
                className="form-input"
                type="text"
                name="teamID"
                value={formData.teamID}
                onChange={handleChange}
                placeholder="Leave blank if not on a team"
              />
            </div>

            <div className="submit-group">
              <button
                className="submit-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
