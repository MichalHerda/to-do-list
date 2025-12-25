function CategoryItem({ category, onEdit, onDelete }) {
  const token = localStorage.getItem('access_token')

  const handleDelete = async () => {
    await fetch(`http://localhost:8000/categories/${category.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    onDelete(category.id)
  }

  return (
    <div className="flex justify-between items-center p-3 bg-gray-900 rounded">
      <span>{category.name}</span>

      <div className="flex gap-2">
        <button onClick={() => onEdit(category)}>Edit</button>
        <button onClick={handleDelete} className="text-red-400">
          Delete
        </button>
      </div>
    </div>
  )
}

export default CategoryItem
