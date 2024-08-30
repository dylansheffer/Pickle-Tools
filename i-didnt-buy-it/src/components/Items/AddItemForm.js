import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import './AddItemForm.css'

const AddItemForm = ({ updateTotalSavings }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('No user logged in')

      const { data, error } = await supabase
        .from('items')
        .insert([{ 
          name, 
          price: parseFloat(price), 
          user_id: user.id 
        }])
      if (error) throw error
      console.log('Item added:', data)
      updateTotalSavings()  // Call this function after successful addition
      navigate('/')
    } catch (error) {
      console.error('Error adding item:', error.message)
      setError('Failed to add item. Please try again.')
    }
  }

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      {error && <p className="error" role="alert">{error}</p>}
      <div>
        <label htmlFor="item-name">Item name</label>
        <input
          id="item-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="item-price">Price</label>
        <input
          id="item-price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  )
}

export default AddItemForm