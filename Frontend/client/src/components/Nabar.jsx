import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


export default function Nabar() {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () =>{
        logout();
    }
  return (
    <nav className='navbar'>
        <div className="nav-brand">
            <Link to = "/" className='navbar-logo'>RecipeFinder</Link>
        </div>
        <ul className="navbar-links">
            {user ? (
                <>
                    <li className='navbar-greeting'>Welcome,{user.name}!
                    </li>
                    <li>
                        <Link to='/favorites'>My Favorites</Link>
                    </li>
                    <li>
                        <button onClick = {handleLogout} className='logout-button'>Logout  </button>
                    </li>
                </>
            ) :(
                <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register     </Link>
                    </li>

                </>
            )}
        </ul>
    </nav>
  )
}
