import { useEffect, useState } from 'react'
import EmptyTodos from './EmptyTodos'

function TodosPage() {
  const [todos, setTodos] = useState(null) // null = not known
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    if (!token) return

    fetch('http://localhost:8000/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then(data => {
        setTodos(data)
      })
      .catch(() => {
        // if something goes wrong, we treat it as a lack of todos
        setTodos([])
      })
  }, [token])

  // 1️⃣ backend not answering yet
  if (todos === null) {
    return (
      <div className="text-gray-400">
        Loading todos...
      </div>
    )
  }

  // empty state
  if (todos.length === 0) {
    return <EmptyTodos />
  }

  // not empty todos list:
  return (
    <div className="text-gray-300">
      Todo list will be rendered here ({todos.length} items)
    </div>
  )
}

export default TodosPage
