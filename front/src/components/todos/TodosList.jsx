import { useEffect, useRef } from 'react'
import TodoItem from './TodoItem'

function TodosList({ todos, categories, onTodoUpdated, onTodoDeleted }) {
  const listRef = useRef(null)

  useEffect(() => {
    const savedScroll = localStorage.getItem('todos_scroll')
    if (listRef.current && savedScroll) {
      listRef.current.scrollTop = Number(savedScroll)
    }
  }, [])

  const handleScroll = () => {
    if (listRef.current) {
      localStorage.setItem('todos_scroll', listRef.current.scrollTop)
    }
  }

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto py-4 space-y-2 bg-gray-900"
    >
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={categories}
          onUpdated={onTodoUpdated}
          onDeleted={onTodoDeleted}
        />
      ))}
    </div>
  )
}

export default TodosList
