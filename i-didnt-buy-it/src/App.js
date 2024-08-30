import React, { useContext, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { UserProvider, UserContext } from './context/UserContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ItemList from './components/Items/ItemList'
import AddItemForm from './components/Items/AddItemForm'
import TotalSavings from './components/TotalSavings/TotalSavings'
import Login from './components/Auth/Login'
import { supabase } from './services/supabase'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext)
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  return user ? children : <Navigate to="/login" />
}

const App = () => {
  const [totalSavings, setTotalSavings] = useState(0)
  const { loading } = useContext(UserContext)

  const fetchTotalSavings = async () => {
    const { data, error } = await supabase
      .from('items')
      .select('price')
    
    if (error) {
      console.error('Error fetching total savings:', error)
    } else {
      const total = data.reduce((sum, item) => sum + item.price, 0)
      setTotalSavings(total)
    }
  }

  useEffect(() => {
    fetchTotalSavings()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <>
                  <TotalSavings totalSavings={totalSavings} />
                  <ItemList updateTotalSavings={fetchTotalSavings} />
                </>
              </ProtectedRoute>
            } />
            <Route path="/add" element={
              <ProtectedRoute>
                <AddItemForm updateTotalSavings={fetchTotalSavings} />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

const AppWrapper = () => (
  <UserProvider>
    <App />
  </UserProvider>
)

export default AppWrapper
