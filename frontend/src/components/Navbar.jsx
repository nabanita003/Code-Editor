// import React from 'react'
// import logo from '../Images/logo.png'
// import { Link, useNavigate } from 'react-router-dom'
// import { api_base_url } from '../helper';

// const Navbar = () => {
//   const navigate = useNavigate();

// const handleLogout = async () => {
//   try {
//     await fetch(`${api_base_url}/auth/logout`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${localStorage.getItem("token")}`
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   localStorage.removeItem("token");
//   localStorage.removeItem("isLoggedIn");

//   navigate("/login");
// };

//   return (
//     <div className="nav flex px-25 items-center justify-between h-22.5 bg-[#0f0e0e]">
//       <img src={logo} className='w-42.5 object-cover' alt="" />

//       <div className="links flex items-center gap-3.75">
//         <Link to="/" className='hover:text-blue-500'>Home</Link>
//         <Link to="/about" className='hover:text-blue-500'>About</Link>
//         <Link to="/services" className='hover:text-blue-500'>Services</Link>
//         <Link to="/contact" className='hover:text-blue-500'>Contact</Link>

//         <button 
//           onClick={handleLogout}
//           className="btnNormal bg-red-500 hover:bg-red-600 px-5"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Navbar;


import React, { useState } from 'react'
import logo from '../Images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper'
import { Menu, X } from 'lucide-react' // install this

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch(`${api_base_url}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-semibold"
      : "hover:text-blue-500 transition"

  return (
    <nav className="bg-[#0f0e0e] text-white px-6 md:px-20 h-16 flex items-center justify-between relative">

      {/* Logo */}
      <img src={logo} className="w-32 md:w-40" alt="logo" />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
        <NavLink to="/services" className={navLinkClass}>Services</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        {isOpen ? (
          <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
        ) : (
          <Menu onClick={() => setIsOpen(true)} className="cursor-pointer" />
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1a1a1a] flex flex-col items-center gap-6 py-6 md:hidden z-50">

          <NavLink onClick={() => setIsOpen(false)} to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/services" className={navLinkClass}>
            Services
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          <button
            onClick={() => {
              setIsOpen(false)
              handleLogout()
            }}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar