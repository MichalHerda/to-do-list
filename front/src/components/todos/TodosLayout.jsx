import TodosToolbar from './TodosToolbar'
import TodosList from './TodosList'

function TodosLayout({
  todos,
  categories,
  onAddTodo,
  onAddCategory,
  onJumpToDate,
  onTodoUpdated,
  onTodoDeleted,
}) {
  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-4">
      <TodosToolbar
        onAddTodo={onAddTodo}
        onAddCategory={onAddCategory}
        onJumpToDate={onJumpToDate}
      />

      <TodosList
        todos={todos}
        categories={categories}
        onTodoUpdated={onTodoUpdated}
        onTodoDeleted={onTodoDeleted}
      />
    </div>
  )
}

export default TodosLayout
