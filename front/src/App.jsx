import { useState, useEffect } from 'react'
import AuthForm from './components/AuthForm'
import UserInfo from './components/UserInfo'
import TodosPage from './components/todos/TodosPage'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)

  const API_URL = 'http://localhost:8000'

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    // 1. Try access token first
    if (accessToken) {
      fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Access expired')
          return res.json()
        })
        .then(data => {
          setIsAuthenticated(true)
          setUsername(data.username)
        })
        .catch(() => {
          tryRefresh(refreshToken)
        })
      return
    }

    // 2. No access token → try refresh
    if (refreshToken) {
      tryRefresh(refreshToken)
    }
  }, [])

  const tryRefresh = async (refreshToken) => {
  if (!refreshToken) return logout()

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(refreshToken),
    })

    if (!res.ok) throw new Error()

    const data = await res.json()
    localStorage.setItem('access_token', data.access_token)

    // fetch user again
    const meRes = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    })

    const meData = await meRes.json()

    setIsAuthenticated(true)
    setUsername(meData.username)
  } catch {
    logout()
  }
}

  const handleAuthSuccess = (username) => {
    setIsAuthenticated(true)
    setUsername(username)
    localStorage.setItem('username', username)
  }

  const logout = () => {
  setIsAuthenticated(false)
  setUsername(null)
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <header className="flex justify-center items-center h-[20vh] w-full border-b border-gray-700">
        <img src="/toDoListLogo.png" alt="Logo aplikacji" className="max-h-full object-contain" />
      </header>

      <main className="flex flex-col h-[80vh] w-full">
        {isAuthenticated && <UserInfo username={username} onLogout={logout} />}
        <div className="flex-1 flex justify-center items-center px-4 bg-gray-900 ">
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
