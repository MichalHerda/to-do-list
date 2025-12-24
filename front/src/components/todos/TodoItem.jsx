function TodoItem({ todo }) {
  return (
    <div className="p-4 bg-gray-800 border border-gray-700 rounded">
      <div className="font-semibold">{todo.title}</div>

      {todo.description && (
        <div className="text-sm text-gray-400">
          {todo.description}
        </div>
      )}
    </div>
  )
}

export default TodoItem
