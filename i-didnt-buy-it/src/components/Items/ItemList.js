import React, { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase'
import ItemCard from './ItemCard'
import ItemTable from './ItemTable'
import './ItemList.css'

const ItemList = ({ updateTotalSavings }) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    fetchItems()

    const channel = supabase
      .channel('public:items')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'items' }, payload => {
        console.log('Change received!', payload)
        fetchItems()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error

      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
      setError('Failed to load items. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteItem = async (id) => {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id)
      if (error) throw error
      setItems(items.filter(item => item.id !== id))
      updateTotalSavings()  // Call this function after successful deletion
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  if (isLoading) return <p aria-live="polite">Loading items...</p>
  if (error) return <p aria-live="assertive" role="alert">{error}</p>

  return (
    <section className="item-list" aria-label="List of items not purchased">
      <h2>Items Not Purchased</h2>
      {items.length === 0 ? (
        <p>No items added yet. Start saving by adding items you didn't buy!</p>
      ) : isMobile ? (
        <div className="item-grid">
          {items.map(item => (
            <ItemCard key={item.id} item={item} onDelete={deleteItem} />
          ))}
        </div>
      ) : (
        <ItemTable items={items} onDelete={deleteItem} />
      )}
    </section>
  )
}

export default ItemList