import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
    } else {
      setErrors(validationErrors);
    }

    try {
      const response = await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
        role,
      });

      console.log(response);

      if (response.status === 201) {
        toast.success("Successfully registered");
      }

      setName("");
      setEmail("");
      setPassword("");
      setRole("");

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while registering");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register yourself</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary text-center px-10">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
