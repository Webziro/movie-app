import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues((values) => ({...values,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setApiError("");
    setSuccess(false);

    if (values.username && values.email && values.password) {
      setValid(true);
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.username,
            email: values.email,
            password: values.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess(true);
          setValues({ username: "", email: "", password: "" });
          setSubmitted(false);
          setTimeout(() => navigate("/"), 1000);
        } else {
          setApiError(data.message || "Registration failed");
        }
      } catch (error) {
        setApiError("Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setValid(false);
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {success && (
          <div className="success-message">
            <h3>Welcome {values.username} {values.email}</h3>
            <div>Your registration was successful!</div>
          </div>
        )}
        {apiError && <div className="error-message">{apiError}</div>}

        {!valid && (
          <input
            className="form-field"
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
          />
        )}
        {submitted &&!values.username && (
          <span id="first-name-error">Please enter a username</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        )}
        {submitted &&!values.email && (
          <span id="last-name-error">Please enter an email</span>
        )}

        {!valid && (
          <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        )}
        {submitted &&!values.password && (
          <span id="password-error">Please enter a password</span>
        )}

        {!valid && (
          <button className="form-field" type="submit" disabled={loading}>
            {loading? "Registering...": "Register"}
          </button>
        )}
      </form>
    </div>
  );
}