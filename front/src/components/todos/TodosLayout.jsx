import TodosToolbar from './TodosToolbar'
import TodosList from './TodosList'

function TodosLayout({ todos, onAddTodo, onAddCategory, onJumpToDate }) {
  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-4">
      <TodosToolbar
        onAddTodo={onAddTodo}
        onAddCategory={onAddCategory}
        onJumpToDate={onJumpToDate}
      />

      <TodosList todos={todos} />
    </div>
  )
}

export default TodosLayout
