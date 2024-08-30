import React, { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase'
import ItemCard from './ItemCard'

const ItemList = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
    const subscription = supabase
      .from('items')
      .on('*', payload => {
        console.log('Change received!', payload)
        fetchItems()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error('Error fetching items:', error)
    else setItems(data)
  }

  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ItemList