import React, { useState } from 'react'
import { supabase } from '../../services/supabase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { user, error } = await supabase.auth.signIn({ email, password })
      if (error) throw error
      console.log('User logged in:', user)
      // Redirect or update app state
    } catch (error) {
      console.error('Error logging in:', error.message)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  )
}

export default Login