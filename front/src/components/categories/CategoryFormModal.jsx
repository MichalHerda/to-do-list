import { useState } from 'react'

function CategoryFormModal({ category, onClose, onCreated, onUpdated }) {
  const [name, setName] = useState(category.name || '')
  const token = localStorage.getItem('access_token')
  const isEdit = Boolean(category.id)

  const handleSubmit = async () => {
    const res = await fetch(
      `http://localhost:8000/categories${isEdit ? '/' + category.id : ''}`,
      {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      }
    )

    const data = await res.json()

    isEdit ? onUpdated(data) : onCreated(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded w-80">
        <h3 className="mb-4">
          {isEdit ? 'Edit category' : 'Add category'}
        </h3>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-900 border"
          placeholder="Category name"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 px-4 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryFormModal
