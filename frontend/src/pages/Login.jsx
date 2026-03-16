import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import PrimaryButton from "../components/common/PrimaryButton";
import Card from "../components/common/Card";

const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (Object.values(loginForm).some((data) => data === "")) {
      alert("All fields are required!");
      return;
    }

    const role = loginForm.username === "admin" && loginForm.password === "admin"
      ? "admin"
      : "user";

    sessionStorage.setItem("token", "mock-token");
    sessionStorage.setItem("fittrack_user", JSON.stringify({ username: loginForm.username, role }));
    navigate(role === "admin" ? "/admin" : "/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-orange-100 p-5">
      <div className="w-full max-w-md">

        {/* Logo */}
        <header className="text-center mb-9">
          <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-orange-300">
            🏋️
          </div>
          <h1 className="text-3xl font-black text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>
            FitTrack
          </h1>
          <p className="text-gray-400 text-sm mt-1">Your personal fitness companion</p>
        </header>

        <Card className="p-9">
          <hgroup className="mb-7">
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>
              Login
            </h2>
            <p className="text-gray-500 text-sm mt-1">Welcome back! Sign in to continue.</p>
          </hgroup>

          <form onSubmit={handleLogin}>
          <InputField
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            required
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
          />

          <div className="mt-2">
            <PrimaryButton type="submit">Sign In →</PrimaryButton>
          </div>
          </form>

          <p className="text-center mt-5 text-sm text-gray-500">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="text-orange-500 font-semibold cursor-pointer underline">
              Sign up
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;