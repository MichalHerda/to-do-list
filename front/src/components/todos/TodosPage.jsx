import { useEffect, useState } from 'react'
import EmptyTodos from './EmptyTodos'
import AddTodoModal from './AddTodoModal'
import AddCategoryModal from './AddCategoryModal'

function TodosPage() {
  const [todos, setTodos] = useState(null)
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)

  const token = localStorage.getItem('access_token')

  useEffect(() => {
    if (!token) return

    fetch('http://localhost:8000/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setTodos)
      .catch(() => setTodos([]))
  }, [token])

  if (todos === null) return <div>Loading...</div>

  if (todos.length === 0) {
    return (
      <>
        <EmptyTodos
          onAddTodo={() => setShowAddTodo(true)}
          onAddCategory={() => setShowAddCategory(true)}
        />

        {showAddTodo && (
          <AddTodoModal onClose={() => setShowAddTodo(false)} />
        )}

        {showAddCategory && (
          <AddCategoryModal onClose={() => setShowAddCategory(false)} />
        )}
      </>
    )
  }

  return <div>Todo list later</div>
}

export default TodosPage
