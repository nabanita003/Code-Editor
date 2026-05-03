
import React, { useState, useEffect, useRef } from 'react'
import logo from '../Images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper'
import { Menu, X, User } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const desktopDropdownRef = useRef()
  const mobileDropdownRef = useRef()

  const email = localStorage.getItem("email")
  const isLoggedIn = localStorage.getItem("token")

  //  Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      desktopDropdownRef.current &&
      !desktopDropdownRef.current.contains(e.target) &&
      mobileDropdownRef.current &&
      !mobileDropdownRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)
  return () => document.removeEventListener("mousedown", handleClickOutside)
}, [])
  
  // Logout
  const handleLogout = async () => {
    try {
      await fetch(`${api_base_url}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
    } catch (err) {
      console.log(err)
    }

    localStorage.removeItem("token")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("email")

    navigate("/login")
  }

  //  Active link style
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-semibold"
      : "hover:text-blue-400 transition"

  return (
    <nav className="bg-[#0f0e0e] text-white px-6 md:px-20 h-16 flex items-center justify-between relative">

      {/* LOGO */}
      <img
        src={logo}
        className="w-32 md:w-40 cursor-pointer"
        onClick={() => navigate("/")}
        alt="logo"
      />

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6">

        <NavLink to="/home" className={navLinkClass}>Home</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
        <NavLink to="/problems" className={navLinkClass}>Problems</NavLink>
        <NavLink to="/services" className={navLinkClass}>Services</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

        {/* AVATAR */}
        {isLoggedIn && (
          <div className="relative" ref={desktopDropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] flex items-center justify-center cursor-pointer transition"
            >
            {/* <User size={20} className="text-gray-300" /> */}
            {email ? email.charAt(0).toUpperCase() : <User size={20} className="text-gray-300" />}
            </div>

            {/* DROPDOWN */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-[#1a1a1a] rounded shadow-lg p-3 w-44 border border-gray-700 z-50">

                <p className="text-sm text-gray-400 mb-2 truncate">
                  {email}
                </p>

                <button
                  onClick={handleLogout}
                  className="w-full text-left hover:text-red-500 transition"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

      </div>

      {/* MOBILE MENU ICON */}
{/* MOBILE HEADER (Avatar + Menu) */}
<div className="md:hidden flex items-center gap-3">

  {/* AVATAR */}
  {isLoggedIn && (
    <div className="relative" ref={mobileDropdownRef}>
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center cursor-pointer"
      >
        {email
          ? email.charAt(0).toUpperCase()
          : <User size={18} className="text-gray-300" />
        }
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-[#1a1a1a] rounded shadow-lg p-3 w-44 border border-gray-700 z-50">
          <p className="text-sm text-gray-400 mb-2 truncate">
            {email}
          </p>

          <button
            onClick={handleLogout}
            className="w-full text-left hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )}

  {/* MENU ICON */}
{isOpen ? (
<X
  onClick={() => {
    setIsOpen(false)
    setIsDropdownOpen(false) 
  }}
  className="cursor-pointer"
/>
) : (
  <Menu
    onClick={() => {
      setIsOpen(true)
      setIsDropdownOpen(false) 
    }}
    className="cursor-pointer"
  />
)}

</div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1a1a1a] flex flex-col items-center gap-6 py-6 md:hidden z-50">

          <NavLink onClick={() => setIsOpen(false)} to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/problems" className={navLinkClass}>
            Problems
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/services" className={navLinkClass}>
            Services
          </NavLink>

          <NavLink onClick={() => setIsOpen(false)} to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          {/* MOBILE AVATAR */}
          {isLoggedIn && (
            <div className="flex flex-col items-center gap-2 mt-4">

              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <User size={22} className="text-gray-300" />
              </div>

              <p className="text-sm text-gray-400">{email}</p>

              <button
                onClick={() => {
                  setIsOpen(false)
                  handleLogout()
                }}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded transition"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      )}

    </nav>
  )
}

export default Navbar
