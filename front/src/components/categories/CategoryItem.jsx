import { useState } from 'react'

function CategoryItem({ category, onDelete, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(category.name)
  const token = localStorage.getItem('access_token')

  const handleSave = async () => {
    if (!name.trim()) return

    const res = await fetch(
      `http://localhost:8000/categories/${category.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      }
    )

    const updated = await res.json()
    onUpdated(updated)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    await fetch(
      `http://localhost:8000/categories/${category.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    onDelete(category.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    }

    if (e.key === 'Escape') {
      setName(category.name) // rollback
      setIsEditing(false)
    }
  }

  return (
    <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
      {isEditing ? (
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="bg-gray-900 p-1 rounded flex-1 mr-2"
        />
      ) : (
        <span>{category.name}</span>
      )}

      <div className="flex gap-2 text-sm">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={handleDelete} className="text-red-400">
          Delete
        </button>
      </div>
    </div>
  )
}

export default CategoryItem
