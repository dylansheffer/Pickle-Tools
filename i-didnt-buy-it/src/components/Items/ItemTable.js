import React from 'react'
import { getUserName } from '../../utils/userUtils'
import './ItemTable.css'

const ItemTable = ({ items, onDelete }) => {
  return (
    <table className="item-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Amount Saved</th>
          <th>Date</th>
          <th>Added By</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
            <td>{getUserName(item.user_id)}</td>
            <td>
              <button onClick={() => onDelete(item.id)} className="delete-btn">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ItemTable