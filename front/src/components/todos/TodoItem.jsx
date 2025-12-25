function TodoItem({ todo }) {
  return (
    <div className="p-4 bg-gray-800 border border-gray-700 rounded space-y-1">
      <div className="font-semibold">{todo.title}</div>

      {todo.description && (
        <div className="text-sm text-gray-400">
          {todo.description}
        </div>
      )}

      <div className="flex gap-4 text-xs text-gray-500">
        <span>
          Category: {todo.category_id ?? 'default'}
        </span>

        {todo.due_date && (
          <span>
            Due: {new Date(todo.due_date).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  )
}

export default TodoItem
