import { useState } from 'react'

function CategoriesModal({ categories, onCategoryAdded, onClose }) {
  const [name, setName] = useState('')
  const token = localStorage.getItem('access_token')

  const handleSubmit = async (e) => {
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
    onCategoryAdded(newCategory)
    setName('')
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded w-full max-w-md max-h-[80vh] flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Categories</h3>

        <ul className="space-y-2 overflow-y-auto flex-1 pr-1">
          {categories.map(cat => (
            <li
              key={cat.id}
              className="px-3 py-2 bg-gray-700 rounded"
            >
              {cat.name}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="flex gap-2">
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

        <button
          onClick={onClose}
          className="w-full text-gray-400 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default CategoriesModal
