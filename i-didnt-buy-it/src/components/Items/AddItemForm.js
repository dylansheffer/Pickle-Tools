import React, { useState } from 'react'
import { supabase } from '../../services/supabase'

const AddItemForm = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('items')
        .insert([{ name, price: parseFloat(price) }])
      if (error) throw error
      console.log('Item added:', data)
      setName('')
      setPrice('')
      // Optionally, trigger a refresh of the item list
    } catch (error) {
      console.error('Error adding item:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  )
}

export default AddItemForm