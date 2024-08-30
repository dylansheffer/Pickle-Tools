import React, { createContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = supabase.auth.getSession()
    setUser(session?.user ?? null)
    setLoading(false)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}