import { useState } from 'react'

function AddCategoryModal({ onClose }) {
  const [name, setName] = useState('')
  const token = localStorage.getItem('access_token')

  const handleSubmit = async () => {
    await fetch('http://localhost:8000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded w-80">
        <h3 className="text-lg mb-4">Add category</h3>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-900 border"
          placeholder="Category name"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 px-4 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCategoryModal
