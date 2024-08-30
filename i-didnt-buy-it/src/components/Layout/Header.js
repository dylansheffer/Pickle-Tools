import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { supabase } from '../../services/supabase'
import './Header.css'

const Header = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate('/login')
  }

  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add Item</Link></li>
          {user ? (
            <li><button onClick={handleLogout}>Log Out</button></li>
          ) : (
            <li><Link to="/login">Log In</Link></li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header