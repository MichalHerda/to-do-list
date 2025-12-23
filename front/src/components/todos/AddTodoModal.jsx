import { useState } from 'react'

function AddTodoModal({ onClose }) {
  const [title, setTitle] = useState('')
  const token = localStorage.getItem('access_token')

  const handleSubmit = async () => {
    await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded w-96">
        <h3 className="text-lg mb-4">Add todo</h3>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-900 border"
          placeholder="Todo title"
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

export default AddTodoModal
