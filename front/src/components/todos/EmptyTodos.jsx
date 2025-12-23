function EmptyTodos() {
  return (
    <div className="flex flex-col items-center gap-4 text-gray-300">
      <p>Your todo list is empty</p>

      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 rounded">
          Add todo
        </button>
        <button className="px-4 py-2 bg-gray-600 rounded">
          Add category
        </button>
      </div>
    </div>
  )
}

export default EmptyTodos
