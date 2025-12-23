function EmptyTodos({ onAddTodo, onAddCategory }) {
  return (
    <div className="flex flex-col items-center gap-6 text-gray-300">
      <p className="text-lg">Your todo list is empty</p>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 rounded"
          onClick={onAddTodo}
        >
          Add todo
        </button>

        <button
          className="px-4 py-2 bg-gray-600 rounded"
          onClick={onAddCategory}
        >
          Add category
        </button>
      </div>
    </div>
  )
}

export default EmptyTodos
