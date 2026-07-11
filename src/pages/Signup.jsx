import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      toast.success("Account created! Please login.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blush-100 via-blush-50 to-gold-400/20">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-xl w-80 border border-blush-200"
      >
        <h2 className="text-3xl font-display font-bold mb-1 text-center text-blush-700">
          Create Account
        </h2>
        <p className="text-center text-sm text-blush-400 mb-6">
          Join us to get started
        </p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-blush-200 focus:border-blush-500 focus:outline-none rounded-lg p-2.5 w-full mb-3 transition-colors"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-blush-200 focus:border-blush-500 focus:outline-none rounded-lg p-2.5 w-full mb-3 transition-colors"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-blush-200 focus:border-blush-500 focus:outline-none rounded-lg p-2.5 w-full mb-4 transition-colors"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blush-500 hover:bg-blush-600 text-white w-full p-2.5 rounded-lg font-medium transition-colors shadow-md"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm text-blush-600">
          Already have an account?{" "}
          <Link to="/" className="text-blush-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
