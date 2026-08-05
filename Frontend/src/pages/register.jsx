import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]=useState("Frontend Engineer");
  const navigate = useNavigate();

  const registerHandler = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-600 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-2">
          Jira AI
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create Your Account
        </p>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />
        <select
        value ={role}
        onChange={(e)=>
          setRole(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4">
            <option>
              Frontend Engineer
            </option>
            <option>
              Backend Engineer
            </option>
            <option>
              Full Stack Engineer
            </option>
            <option>
              DevOps Engineer
            </option>
          </select>


        <button
          onClick={registerHandler}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center mt-6">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 ml-2 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;