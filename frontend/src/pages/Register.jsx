import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (!value.trim()) {
      setValidationError(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
      );
    } else if (name === "email" && !isValidEmail(value)) {
      setValidationError("Enter a valid email address.");
    } else if (name === "password" && value.length < 6) {
      setValidationError("Password must be at least 6 characters.");
    } else {
      setValidationError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setValidationError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setValidationError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-xl max-w-sm w-full">
        <h2 className="text-center text-2xl font-semibold mb-4">Register</h2>

        {/* Error Messages */}
        {validationError && (
          <div className="text-red-500 text-center mb-4">{validationError}</div>
        )}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!!validationError} // Disable button if there's a validation error
            className={`w-full text-white p-3 rounded-lg transition-all ${
              validationError
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
