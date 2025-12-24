import { useEffect, useState } from 'react'
import EmptyTodos from './EmptyTodos'
import AddTodoModal from './AddTodoModal'
import AddCategoryModal from './AddCategoryModal'
import TodosLayout from './TodosLayout'

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

  return (
    <>
      {/* === MAIN CONTENT === */}
      {todos.length === 0 ? (
        <EmptyTodos
          onAddTodo={() => setShowAddTodo(true)}
          onAddCategory={() => setShowAddCategory(true)}
        />
      ) : (
        <TodosLayout
          todos={todos}
          onAddTodo={() => setShowAddTodo(true)}
          onAddCategory={() => setShowAddCategory(true)}
          onJumpToDate={() => console.log('jump to date')}
        />
      )}

      {/* === MODALS (ALWAYS AVAILABLE) === */}
      {showAddTodo && (
        <AddTodoModal onClose={() => setShowAddTodo(false)} />
      )}

      {showAddCategory && (
        <AddCategoryModal onClose={() => setShowAddCategory(false)} />
      )}
    </>
  )
}

export default TodosPage
