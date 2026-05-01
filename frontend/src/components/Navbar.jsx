// import React, { useState } from 'react'
// import logo from '../Images/logo.png'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { api_base_url } from '../helper'
// import { Menu, X, User } from 'lucide-react' // install this

// const Navbar = () => {
//   const navigate = useNavigate()
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// const email = localStorage.getItem("email");
// const firstLetter = email ? email.charAt(0).toUpperCase() : "";

//   const handleLogout = async () => {
//     try {
//       await fetch(`${api_base_url}/auth/logout`, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }

//     localStorage.removeItem("token");
//     localStorage.removeItem("isLoggedIn");
//     navigate("/login");
//   };

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? "text-blue-500 font-semibold"
//       : "hover:text-blue-500 transition"

//   return (
//     <nav className="bg-[#0f0e0e] text-white px-6 md:px-20 h-16 flex items-center justify-between relative">

//       {/* Logo */}
//       <img src={logo} className="w-32 md:w-40" alt="logo" />

//       {/* Desktop Menu */}
//       <div className="hidden md:flex items-center gap-6">
//         <NavLink to="/" className={navLinkClass}>Home</NavLink>
//         <NavLink to="/about" className={navLinkClass}>About</NavLink>
//         <NavLink to="/services" className={navLinkClass}>Services</NavLink>
//         <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

//         {/* <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
//         >
//           Logout
//         </button> */}

//         <div className="relative">
// <div
//   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//   className="w-10 h-10 rounded-full bg-[#2a2a2a] hover:bg-[#3a3a3a] flex items-center justify-center cursor-pointer transition"
// >
//   <User size={20} className="text-gray-300" />
// </div>

//   {/* Dropdown */}
//   {isDropdownOpen && (
//     <div className="absolute right-0 mt-2 bg-[#1a1a1a] rounded shadow-lg p-3 w-40">
//       <p className="text-sm text-gray-400 mb-2">{email}</p>

//       <button
//         onClick={handleLogout}
//         className="w-full text-left hover:text-red-500"
//       >
//         Logout
//       </button>
//     </div>
//   )}
// </div>
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         {isOpen ? (
//           <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
//         ) : (
//           <Menu onClick={() => setIsOpen(true)} className="cursor-pointer" />
//         )}
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="absolute top-16 left-0 w-full bg-[#1a1a1a] flex flex-col items-center gap-6 py-6 md:hidden z-50">

//           <NavLink onClick={() => setIsOpen(false)} to="/" className={navLinkClass}>
//             Home
//           </NavLink>

//           <NavLink onClick={() => setIsOpen(false)} to="/about" className={navLinkClass}>
//             About
//           </NavLink>

//           <NavLink onClick={() => setIsOpen(false)} to="/services" className={navLinkClass}>
//             Services
//           </NavLink>

//           <NavLink onClick={() => setIsOpen(false)} to="/contact" className={navLinkClass}>
//             Contact
//           </NavLink>

//           <button
//             onClick={() => {
//               setIsOpen(false)
//               handleLogout()
//             }}
//             className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded"
//           >
//             Logout
//           </button>
          
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar



import React, { useState, useEffect, useRef } from 'react'
import logo from '../Images/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { api_base_url } from '../helper'
import { Menu, X, User } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef()

  const email = localStorage.getItem("email")
  const isLoggedIn = localStorage.getItem("token")

  //  Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ✅ Logout
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

  // ✅ Active link style
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

        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
        <NavLink to="/services" className={navLinkClass}>Services</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

        {/* AVATAR */}
        {isLoggedIn && (
          <div className="relative" ref={dropdownRef}>
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
      <div className="md:hidden">
        {isOpen ? (
          <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
        ) : (
          <Menu onClick={() => setIsOpen(true)} className="cursor-pointer" />
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