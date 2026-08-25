import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard", {
      replace: true,
    });
  }
}, [navigate]);
  const loginHandler = async () => {
    try {
      const { data } = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem(
        "token",
        data.token
      );
      localStorage.setItem(
        "role",
        data.role
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-2">
          Jira AI
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Welcome Back
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
        />
        <button
          onClick={loginHandler}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Login
        </button>
        <p
          className="mt-4 text-center cursor-pointer text-blue-600"
          onClick={() =>
            navigate("/register")
          }
        >
          Register
        </p>
      </div>

    </div>
  );
}
export default Login;
