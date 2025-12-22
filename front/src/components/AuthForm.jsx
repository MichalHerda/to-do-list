import { useState } from 'react'

function AuthForm({ onAuthSuccess }) {
  const [mode, setMode] = useState('login')
  const [stayLoggedIn, setStayLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState({})
  const isLogin = mode === 'login'

  const API_URL = 'http://localhost:8000'

const handleSubmit = async (e) => {
  e.preventDefault()
  setError({})

  // WALIDACJE PODSTAWOWE
  if (!username.trim()) return setError({ username: 'Username is required' })
  if (!password) return setError({ password: 'Password is required' })
  if (!isLogin && password.length < 5)
    return setError({ password: 'Password must be at least 5 characters' })
  if (!isLogin && password !== confirmPassword)
    return setError({ confirmPassword: 'Passwords do not match' })

  // LOGIN
  if (isLogin) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        // backend odpowiada np. 401
        throw new Error('Invalid credentials')
      }

      const data = await res.json()

      // ZAPIS JWT
      localStorage.setItem('access_token', data.access_token)

      // PRZEKAZUJEMY STAN DO APP.JSX
      onAuthSuccess?.(username)

    } catch (err) {
      setError({ password: 'Invalid username or password' })
    }
    return
  }
// SIGNUP
if (!isLogin) {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Signup failed')
    }

    // opcjonalnie: od razu zaloguj po signupie
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    const loginData = await loginRes.json()
    localStorage.setItem('access_token', loginData.access_token)

    onAuthSuccess?.(username)

  } catch (err) {
    setError({ username: err.message })
  }
}

  
}

  const resetForm = () => {
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setError({})
    setStayLoggedIn(false)
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-center text-2xl font-bold">{isLogin ? 'Login' : 'Sign up'}</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={`p-2 rounded border ${
          error.username ? 'border-red-500' : 'border-gray-600'
        } bg-gray-900 text-white`}
      />
      {error.username && <div className="text-red-500 text-sm">{error.username}</div>}

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-2 rounded border ${
            error.password ? 'border-red-500' : 'border-gray-600'
          } bg-gray-900 text-white`}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          onClick={() => setShowPassword((p) => !p)}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
      {error.password && <div className="text-red-500 text-sm">{error.password}</div>}

      {!isLogin && (
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-2 rounded border ${
              error.confirmPassword ? 'border-red-500' : 'border-gray-600'
            } bg-gray-900 text-white`}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setShowConfirmPassword((p) => !p)}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>
      )}
      {error.confirmPassword && <div className="text-red-500 text-sm">{error.confirmPassword}</div>}

      {isLogin && (
        <label className="flex items-center gap-2 text-gray-400 text-sm">
          <input
            type="checkbox"
            checked={stayLoggedIn}
            onChange={(e) => setStayLoggedIn(e.target.checked)}
            className="w-4 h-4"
          />
          Stay logged in
        </label>
      )}

      <button
        type="submit"
        className="mt-2 p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
      >
        {isLogin ? 'Login' : 'Sign up'}
      </button>

      <p className="text-center text-gray-400 text-sm mt-2">
        {isLogin ? (
          <>
            Don’t have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => {
                setMode('signup')
                resetForm()
              }}
            >
              Sign up
            </span>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => {
                setMode('login')
                resetForm()
              }}
            >
              Login
            </span>
          </>
        )}
      </p>
    </form>
  )
}

export default AuthForm
