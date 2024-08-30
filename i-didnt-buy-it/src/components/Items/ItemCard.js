import React from 'react'
import { getUserName } from '../../utils/userUtils'
import './ItemCard.css'

const ItemCard = ({ item, onDelete }) => {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p className="price">${item.price.toFixed(2)}</p>
      <p className="date">{new Date(item.created_at).toLocaleDateString()}</p>
      <p className="adder">Added by: {getUserName(item.user_id)}</p>
      <button onClick={() => onDelete(item.id)} className="delete-btn">Delete</button>
    </div>
  )
}

export default ItemCard