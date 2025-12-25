import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function AddTodoModal({ onClose, onTodoCreated }) {
  const token = localStorage.getItem('access_token')

  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState(null)

  // Load categories on modal open
  useEffect(() => {
    fetch('http://localhost:8000/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          // Fallback category when user has no categories yet
          setCategories([{ id: null, name: 'Default' }])
          setCategoryId(null)
        } else {
          setCategories(data)
          setCategoryId(data[0].id)
        }
      })
      .catch(() => {
        setCategories([{ id: null, name: 'Default' }])
        setCategoryId(null)
      })
  }, [token])

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        due_date: dueDate ? dueDate.toISOString() : null,
        category_id: categoryId,
      }),
    })
    const newTodo = await res.json()

    onTodoCreated(newTodo)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded w-96">
        <h3 className="text-lg mb-4">Add todo</h3>

        {/* Todo title */}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-900 border border-gray-700 rounded"
          placeholder="Todo title"
        />

        {/* Due date */}
        <div className="mb-4">
          <DatePicker
            selected={dueDate}
            onChange={date => setDueDate(date)}
            placeholderText="Select due date"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Category select */}
        <select
          value={categoryId ?? ''}
          onChange={e => setCategoryId(e.target.value || null)}
          className="w-full p-2 mb-6 bg-gray-900 border border-gray-700 rounded"
        >
          {categories.map(cat => (
            <option key={cat.id ?? 'default'} value={cat.id ?? ''}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTodoModal
