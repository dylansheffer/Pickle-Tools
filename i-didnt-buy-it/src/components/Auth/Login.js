import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { UserContext } from '../../context/UserContext'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      setUser(data.user)
      navigate('/')
    } catch (error) {
      console.error('Error logging in:', error.message)
      setError('Failed to log in. Please check your credentials and try again.')
    }
  }

  if (user) {
    return null // or a loading indicator
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Log In</h2>
      {error && <p className="error" role="alert">{error}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  )
}

export default Login