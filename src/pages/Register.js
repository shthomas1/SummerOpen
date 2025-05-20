import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "../styles/pages/Register.css";
import { FaGithub } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "beginner",
    interests: "",
    agreeTerms: false,
    githubUsername: "",
    categories: {
      aiAssistants: false,
      webDevelopment: false,
      dataVisualization: false,
      gameDevelopment: false,
      climateAction: false,
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // GitHub OAuth Configuration
  const githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const redirectUri =
    process.env.REACT_APP_REDIRECT_URI || `${window.location.origin}/register`;

  // Define fetchGitHubUserData first to avoid circular dependencies
  const fetchGitHubUserData = async (token) => {
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: { Authorization: `token ${token}` },
      });

      const userData = await response.json();

      let email = userData.email;
      if (!email) {
        const emailResponse = await fetch(
          "https://api.github.com/user/emails",
          {
            headers: { Authorization: `token ${token}` },
          }
        );

        const emails = await emailResponse.json();
        const primaryEmail = emails.find((e) => e.primary) || emails[0];
        if (primaryEmail) {
          email = primaryEmail.email;
        }
      }

      setFormData((prev) => ({
        ...prev,
        name: userData.name || userData.login,
        email: email || "",
        githubUsername: userData.login,
      }));

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  // Then define exchangeCodeForToken
  const exchangeCodeForToken = async (code) => {
    setLoading(true);
    try {
      const response = await fetch("/api/github-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.access_token) {
        await fetchGitHubUserData(data.access_token);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      setLoading(false);
    }
  };

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=user:email`;

  // Categories for the hackathon
  const categories = [
    {
      id: "aiAssistants",
      name: "AI Assistants & Tools",
      description:
        "Create intelligent assistants or tools that use AI to solve real-world problems",
    },
    {
      id: "webDevelopment",
      name: "Web3 & Decentralized Apps",
      description:
        "Build applications leveraging blockchain technology and decentralized networks",
    },
    {
      id: "dataVisualization",
      name: "Data Visualization & Insights",
      description:
        "Transform complex data into visual stories that reveal meaningful patterns",
    },
    {
      id: "gameDevelopment",
      name: "Game Development",
      description:
        "Design interactive gaming experiences with creative mechanics and engaging gameplay",
    },
    {
      id: "climateAction",
      name: "Climate Action Tech",
      description:
        "Develop solutions addressing environmental challenges and promoting sustainability",
    },
  ];

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // Check if there's a code parameter in the URL (GitHub OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !isAuthenticated) {
      exchangeCodeForToken(code);
    }
  }, [isAuthenticated]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleGitHubLogin = () => {
    // Hard-code the values for now to make sure it works
    const clientId = "Ov23liirEqIDwwnIsirA";
    const callbackUrl = "https://summeropen.netlify.app/register";

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&scope=user:email`;

    window.location.href = authUrl;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("category-")) {
      const categoryId = name.replace("category-", "");
      setFormData((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [categoryId]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that at least one category is selected
    const hasCategory = Object.values(formData.categories).some(
      (value) => value
    );

    if (!hasCategory) {
      alert("Please select at least one category you're interested in.");
      return;
    }

    // Form submission logic would go here
    console.log("Form submitted:", formData);

    // Store registration data if needed
    try {
      // You could save to localStorage if you want to access it on the thank you page
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({
          name: formData.name,
          githubUsername: formData.githubUsername,
          email: formData.email,
        })
      );
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }

    // Redirect to thank you page using React Router
    navigate("/thank-you");
  };

  if (!isAuthenticated) {
    return (
      <div className="register-page">
        <div className="container">
          <div className="register-content">
            <h1 className="register-title">
              Register for Summer Open Hackathon
            </h1>
            <p className="register-description">
              Join us on June 28-29, 2025 for an exciting 36-hour coding
              adventure!
            </p>

            <div className="github-auth-container">
              <p>Please sign in with GitHub to register for the hackathon.</p>
              <button
                className="github-button"
                onClick={handleGitHubLogin}
                disabled={loading}
              >
                <FaGithub className="github-icon" />
                {loading ? "Connecting..." : "Sign in with GitHub"}
              </button>
              <p className="github-note">
                We use GitHub authentication to verify your identity and
                streamline the registration process.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-content">
          <h1 className="register-title">Complete Your Registration</h1>

          <div className="github-connected">
            <div className="github-profile">
              <FaGithub className="github-icon" />
              <span>
                Connected as <strong>{formData.githubUsername}</strong>
              </span>
            </div>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Your Name
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Discord
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <small className="input-help">
                We'll send hackathon updates to this email
              </small>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="experience">
                Experience Level
              </label>
              <select
                className="form-select"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3+ years)</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label className="form-label category-label">
                Which categories are you interested in? (Select at least one)
              </label>
              <div className="categories-container">
                {categories.map((category) => (
                  <div className="category-checkbox" key={category.id}>
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      name={`category-${category.id}`}
                      checked={formData.categories[category.id]}
                      onChange={handleChange}
                    />
                    <label htmlFor={`category-${category.id}`}>
                      <span className="category-name">{category.name}</span>
                      <span className="category-description">
                        {category.description}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="interests">
                Tell us more about your project ideas
              </label>
              <textarea
                className="form-textarea"
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Share any specific project ideas or what you hope to learn during the hackathon..."
              />
            </div>

            <div className="form-group full-width">
              <div className="checkbox-group">
                <input
                  className="form-checkbox"
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <label className="checkbox-label" htmlFor="agreeTerms">
                  I agree to the Terms of Service and have read the Privacy
                  Policy
                </label>
              </div>
            </div>

            <div className="submit-group">
              <button className="submit-button" type="submit">
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
