import { useState } from 'react'

function TodoItem({ todo, categories = [], onUpdated, onDeleted }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [categoryId, setCategoryId] = useState(todo.category_id)
  const token = localStorage.getItem('access_token')

  const categoryName =
    categories.find(cat => cat.id === todo.category_id)?.name
    ?? 'Default'

  const handleSave = async () => {
    const res = await fetch(
      `http://localhost:8000/todos/${todo.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          category_id: categoryId,
        }),
      }
    )

    const updated = await res.json()
    onUpdated(updated)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    await fetch(
      `http://localhost:8000/todos/${todo.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    onDeleted(todo.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setTitle(todo.title)
      setCategoryId(todo.category_id)
      setIsEditing(false)
    }
  }

  return (
    <div className="p-4 bg-gray-800 border border-gray-700 rounded space-y-2">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full bg-gray-900 p-2 rounded"
          />

          <select
            value={categoryId ?? ''}
            onChange={e =>
              setCategoryId(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full bg-gray-900 p-2 rounded mt-2"
          >
            <option value="">Default</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <div className="font-semibold">{todo.title}</div>

          <div className="flex gap-4 text-xs text-gray-400">
            <span>Category: {categoryName}</span>
            {todo.due_date && (
              <span>
                Due: {new Date(todo.due_date).toLocaleDateString()}
              </span>
            )}
          </div>
        </>
      )}

      <div className="flex gap-3 text-sm pt-2">
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

export default TodoItem
