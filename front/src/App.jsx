import { useState } from 'react'
import AuthForm from './components/AuthForm'
import UserInfo from './components/UserInfo'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)

  const handleAuthSuccess = (username) => {
    setIsAuthenticated(true)
    setUsername(username)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername(null)
    localStorage.removeItem('isAuthenticated')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* HEADER */}
      <header className="flex justify-center items-center h-[20vh] w-full border-b border-gray-700">
        <img
          src="/toDoListLogo.png"
          alt="Logo aplikacji"
          className="max-h-full object-contain"
        />
      </header>

      {/* MAIN */}
      <main className="flex flex-col h-[80vh] w-full">
        {/* USER INFO – tylko gdy zalogowany */}
        {isAuthenticated && (
          <UserInfo
            username={username}
            onLogout={handleLogout}
          />
        )}

        {/* CONTENT */}
        <div className="flex-1 flex justify-center items-center px-4">
          {!isAuthenticated ? (
            <div className="w-full max-w-md p-6 bg-gray-800 border border-gray-700 rounded-lg">
              <AuthForm onAuthSuccess={handleAuthSuccess} />
            </div>
          ) : (
            <div className="text-gray-400">
              TODO LIST COMING NEXT 🚀
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
