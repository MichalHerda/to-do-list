import { useEffect, useState } from 'react'
import CategoryItem from './CategoryItem'
import CategoryFormModal from './CategoryFormModal'

function CategoriesModal({ onClose }) {
  const [categories, setCategories] = useState([])
  const [editingCategory, setEditingCategory] = useState(null)
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    fetch('http://localhost:8000/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setCategories)
  }, [token])

  const handleCreated = (category) => {
    setCategories(prev => [...prev, category])
  }

  const handleUpdated = (updated) => {
    setCategories(prev =>
      prev.map(c => (c.id === updated.id ? updated : c))
    )
  }

  const handleDeleted = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded w-96">
        <h3 className="text-lg mb-4">Categories</h3>

        <div className="space-y-2">
          {categories.map(category => (
            <CategoryItem
              key={category.id}
              category={category}
              onEdit={setEditingCategory}
              onDelete={handleDeleted}
            />
          ))}
        </div>

        <button
          onClick={() => setEditingCategory({})}
          className="mt-4 bg-blue-600 px-4 py-2 rounded"
        >
          Add category
        </button>

        <button onClick={onClose} className="ml-2">
          Close
        </button>

        {editingCategory && (
          <CategoryFormModal
            category={editingCategory}
            onClose={() => setEditingCategory(null)}
            onCreated={handleCreated}
            onUpdated={handleUpdated}
          />
        )}
      </div>
    </div>
  )
}

export default CategoriesModal
