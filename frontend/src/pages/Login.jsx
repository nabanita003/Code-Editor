import React, {useState} from 'react'
import logo from "../Images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper/index';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

const submitForm = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${api_base_url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pwd })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      toast.success(data.msg);
      navigate("/");
    } else {
      toast.error(data.msg);
    }
  } catch (err) {
    toast.error(err.message);
  }
};
  return (
<div className="flex items-center justify-center min-h-screen bg-[#0f0e0e] px-4">

  <form
    onSubmit={submitForm}
    className="w-full max-w-md bg-[#1a1a1a] p-6 md:p-8 rounded-xl shadow-lg"
  >
    <img className="w-40 mx-auto mb-6" src={logo} alt="" />

    <div className="mb-4">
      <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
        required
        className="w-full p-3 rounded bg-[#2a2a2a] focus:outline-none"
      />
    </div>

    <div className="mb-4">
      <input
        onChange={(e)=>setPwd(e.target.value)}
        value={pwd}
        type="password"
        placeholder="Password"
        required
        className="w-full p-3 rounded bg-[#2a2a2a]"
      />
    </div>

    <p className="text-gray-400 text-sm mb-4">
      Don't have an account?{" "}
      <Link to="/signup" className="text-blue-500">Sign Up</Link>
    </p>

    <button className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded">
      Login
    </button>
  </form>
</div>
  )
}

export default Login