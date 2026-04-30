import React, {useState} from 'react'
import logo from "../Images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper/index';
import { toast } from 'react-toastify';

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

const submitForm = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${api_base_url}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName, email, password: pwd })
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.msg);
      navigate("/login");
    } else {
      toast.error(data.msg);
    }
  } catch (err) {
    toast.error(err.message);
  }
};
  return (
<div className="flex items-center justify-center min-h-screen px-4 animated-bg">

  <form
    onSubmit={submitForm}
    className="w-full max-w-md bg-[#1a1a1a] p-6 md:p-8 rounded-xl shadow-lg"
  >
    <img className="w-40 mx-auto mb-6" src={logo} alt="" />

    <input
      onChange={(e)=>setFullName(e.target.value)}
      value={fullName}
      type="text"
      placeholder="Full Name"
      className="w-full p-3 mb-4 rounded bg-[#2a2a2a]"
    />

    <input
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
      type="email"
      placeholder="Email"
      className="w-full p-3 mb-4 rounded bg-[#2a2a2a]"
    />

    <input
      onChange={(e)=>setPwd(e.target.value)}
      value={pwd}
      type="password"
      placeholder="Password"
      className="w-full p-3 mb-4 rounded bg-[#2a2a2a]"
    />

    <p className="text-gray-400 text-sm mb-4">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-500">Login</Link>
    </p>

    <button className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded">
      Sign Up
    </button>
  </form>
</div>
  )
}

export default Signup