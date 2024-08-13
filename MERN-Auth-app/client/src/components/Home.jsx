import React from "react";
import Image from "../assets/home.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column text-center p-3 bg-success">
      <img src={Image} alt="home" className="img-fluid mb-4" />

      <div className="d-flex gap-2">
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </div>
  );
}
