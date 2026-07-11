import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blush-100 via-blush-50 to-gold-400/20">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-80 border border-blush-200"
      >
        <h2 className="text-3xl font-display font-bold mb-1 text-center text-blush-700">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-blush-400 mb-6">
          Sign in to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          className="border border-blush-200 focus:border-blush-500 focus:outline-none rounded-lg p-2.5 w-full mb-3 transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-blush-200 focus:border-blush-500 focus:outline-none rounded-lg p-2.5 w-full mb-4 transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blush-500 hover:bg-blush-600 text-white w-full p-2.5 rounded-lg font-medium transition-colors shadow-md"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-blush-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blush-700 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
