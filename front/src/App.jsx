import { useState, useEffect } from 'react'
import AuthForm from './components/AuthForm'
import UserInfo from './components/UserInfo'
import TodosPage from './components/todos/TodosPage'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    fetch('http://localhost:8000/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then(data => {
        setIsAuthenticated(true)
        setUsername(data.username)
      })
      .catch(() => {
        // token invalid/expired
        localStorage.removeItem('access_token')
        setIsAuthenticated(false)
        setUsername(null)
      })
  }, [])

  const handleAuthSuccess = (username) => {
    setIsAuthenticated(true)
    setUsername(username)
    localStorage.setItem('username', username)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('username')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <header className="flex justify-center items-center h-[20vh] w-full border-b border-gray-700">
        <img src="/toDoListLogo.png" alt="Logo aplikacji" className="max-h-full object-contain" />
      </header>

      <main className="flex flex-col h-[80vh] w-full">
        {isAuthenticated && <UserInfo username={username} onLogout={handleLogout} />}
        <div className="flex-1 flex justify-center items-center px-4">
          {!isAuthenticated ? (
            <div className="w-full max-w-md p-6 bg-gray-800 border border-gray-700 rounded-lg">
              <AuthForm onAuthSuccess={handleAuthSuccess} />
            </div>
          ) : (
            <TodosPage />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
