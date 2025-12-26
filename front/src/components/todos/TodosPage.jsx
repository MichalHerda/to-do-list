import { useEffect, useState } from 'react'
import EmptyTodos from './EmptyTodos'
import AddTodoModal from './AddTodoModal'
import CategoriesModal from '../categories/CategoriesModal'
import TodosLayout from './TodosLayout'

function TodosPage() {
  const [todos, setTodos] = useState(null)
  const [categories, setCategories] = useState([])
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  const token = localStorage.getItem('access_token')

  const handleTodoCreated = (newTodo) => {
    setTodos(prev => [...prev, newTodo])
  }

  const handleCategoryAdded = (newCategory) => {
    setCategories(prev => [...prev, newCategory])
  }

  useEffect(() => {
    if (!token) return

    fetch('http://localhost:8000/todos', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setTodos)
      .catch(() => setTodos([]))

    fetch('http://localhost:8000/categories', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [token])

  if (todos === null) return <div>Loading...</div>

  return (
    <>
      {todos.length === 0 ? (
        <EmptyTodos
          onAddTodo={() => setShowAddTodo(true)}
          onAddCategory={() => setShowCategories(true)}
        />
      ) : (
        <TodosLayout
          todos={todos}
          categories={categories}
          onAddTodo={() => setShowAddTodo(true)}
          onAddCategory={() => setShowCategories(true)}
          onJumpToDate={() => console.log('jump to date')}
        />
      )}

      {showAddTodo && (
        <AddTodoModal
          onClose={() => setShowAddTodo(false)}
          onCreated={handleTodoCreated}
          categories={categories}
        />
      )}

      {showCategories && (
        <CategoriesModal
          categories={categories}
          onCategoryAdded={handleCategoryAdded}
          onClose={() => setShowCategories(false)}
        />
      )}
    </>
  )
}

export default TodosPage
