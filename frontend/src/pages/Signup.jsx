import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";
import PrimaryButton from "../components/common/PrimaryButton";
import Card from "../components/common/Card";

const BACKEND_PORT = import.meta.env.VITE_BACKEND_API_PORT;

const Signup = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    fullname:        "",
    age:             "",
    username:        "",
    password:        "",
    confirmPassword: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(signupForm).every((data) => data !== "")) {
        if (signupForm.password === signupForm.confirmPassword) {

          // Destructuring with REST syntax — removes confirmPassword before sending to API
          const { confirmPassword, ...payload } = signupForm;

          const response = await fetch(`${BACKEND_PORT}/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
          });

          const result = await response.json();
          console.log(result.user);

          sessionStorage.setItem("token", result.token);
          sessionStorage.setItem("fittrack_user", JSON.stringify(result.user));
          navigate("/home");

        } else {
          alert("Password Mismatch");
        }
      } else {
        alert("All fields are required!");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-orange-100 p-5">
      <div className="w-full max-w-md">

        {/* Logo */}
        <header className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-orange-300">
            🏋️
          </div>
          <h1 className="text-3xl font-black text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>
            FitTrack
          </h1>
        </header>

        <Card as="section" className="p-9 shadow-md">
          <header className="mb-7">
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>
              Sign Up
            </h2>
            <p className="text-gray-500 text-sm mt-1">Create your account to get started.</p>
          </header>

          <form onSubmit={handleSignup}>
          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={signupForm.fullname}
            onChange={(e) => setSignupForm({ ...signupForm, fullname: e.target.value })}
            required
          />
          <InputField
            label="Age"
            type="number"
            placeholder="23"
            value={signupForm.age}
            onChange={(e) => setSignupForm({ ...signupForm, age: e.target.value })}
            required
          />
          <InputField
            label="Username"
            type="text"
            placeholder="john_doe"
            value={signupForm.username}
            onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
            required
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={signupForm.password}
            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            value={signupForm.confirmPassword}
            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
            required
          />

          <div className="mt-2">
            <PrimaryButton type="submit">
              Create Account →
            </PrimaryButton>
          </div>
          </form>

          <p className="text-center mt-5 text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-orange-500 font-semibold cursor-pointer underline"
            >
              Sign in
            </span>
          </p>
        </Card>

      </div>
    </div>
  );
};

export default Signup;