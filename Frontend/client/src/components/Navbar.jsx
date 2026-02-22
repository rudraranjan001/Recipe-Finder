import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
  }

  const navLinkClass =
    'text-[#333] font-medium no-underline transition-colors duration-200 hover:text-[#f0a500]'

  return (
    <nav className="sticky top-0 z-[1000] flex items-center justify-between bg-white px-8 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div>
        <Link to="/" className="text-2xl font-bold text-[#f0a500] no-underline">
          RecipeFinder
        </Link>
      </div>
      <ul className="m-0 flex list-none items-center gap-6 p-0">
        {user ? (
          <>
            <li className="font-medium text-[#555]">Welcome {user.name}</li>
            <li>
              <Link to="/favorites" className={navLinkClass}>
                My Favorites
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-lg border border-[#f0a500] bg-transparent px-4 py-2 font-medium text-[#f0a500] transition-colors duration-200 hover:bg-[#f0a500] hover:text-white"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={navLinkClass}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className={navLinkClass}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
