import { useEffect, useRef } from 'react'
import TodoItem from './TodoItem'

function TodosList({ todos }) {
  const listRef = useRef(null)

  // Restore scroll position
  useEffect(() => {
    const savedScroll = localStorage.getItem('todos_scroll')
    if (listRef.current && savedScroll) {
      listRef.current.scrollTop = Number(savedScroll)
    }
  }, [])

  // Save scroll position
  const handleScroll = () => {
    if (listRef.current) {
      localStorage.setItem(
        'todos_scroll',
        listRef.current.scrollTop
      )
    }
  }

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto py-4 space-y-2 bg-gray-900"
    >
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodosList
