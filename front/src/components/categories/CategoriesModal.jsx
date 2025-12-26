import { useState } from 'react'
import CategoryItem from './CategoryItem'

function CategoriesModal({ categories, onCategoryAdded, onClose }) {
  const [name, setName] = useState('')
  const [items, setItems] = useState(categories)
  const token = localStorage.getItem('access_token')

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const res = await fetch('http://localhost:8000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })

    const newCategory = await res.json()
    setItems(prev => [...prev, newCategory])
    onCategoryAdded(newCategory)
    setName('')
  }

  const handleDelete = (id) => {
    setItems(prev => prev.filter(c => c.id !== id))
  }

  const handleUpdate = (updated) => {
    setItems(prev =>
      prev.map(c => (c.id === updated.id ? updated : c))
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded w-full max-w-md max-h-[80vh] flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Categories</h3>

        <div className="space-y-2 overflow-y-auto flex-1">
          {items.map(cat => (
            <CategoryItem
              key={cat.id}
              category={cat}
              onDelete={handleDelete}
              onUpdated={handleUpdate}
            />
          ))}
        </div>

        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded"
            placeholder="New category"
          />
          <button className="bg-blue-600 px-4 rounded">
            Add
          </button>
        </form>

        <button onClick={onClose} className="text-gray-400">
          Close
        </button>
      </div>
    </div>
  )
}

export default CategoriesModal
