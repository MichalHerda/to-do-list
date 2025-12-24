function TodosToolbar({ onAddTodo, onAddCategory, onJumpToDate }) {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-700">
      <button
        onClick={onAddTodo}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
      >
        Add Todo
      </button>

      <button
        onClick={onAddCategory}
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
      >
        Add Category
      </button>

      <button
        onClick={onJumpToDate}
        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
      >
        Jump to date
      </button>
    </div>
  )
}

export default TodosToolbar
