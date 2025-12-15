import { useState } from 'react'
import './AuthForm.css'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({})

    if (!username.trim()) {
      setError({ username: 'Username is required' })
      return
    }

    if (!password) {
      setError({ password: 'Password is required' })
      return
    }

    if (!isLogin && password.length < 5) {
      setError({ password: 'Password must be at least 5 characters' })
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setError({ confirmPassword: 'Passwords do not match' })
      return
    }

    if (stayLoggedIn) {
      localStorage.setItem('isAuthenticated', 'true')
    }

    onAuthSuccess()
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
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Sign up'}</h2>

      {/* USERNAME */}
      <div className="field field-dynamic">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={error.username ? 'input-error' : ''}
        />
        {error.username && <div className="auth-error">{error.username}</div>}
      </div>

      {/* PASSWORD */}
      <div className="field field-dynamic">
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error.password ? 'input-error' : ''}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(p => !p)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {error.password && <div className="auth-error">{error.password}</div>}
      </div>

      {/* CONFIRM PASSWORD — TYLKO SIGNUP */}
      {!isLogin && (
        <div className="field field-dynamic">
          <div className="password-field">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={error.confirmPassword ? 'input-error' : ''}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(p => !p)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {error.confirmPassword && (
            <div className="auth-error">{error.confirmPassword}</div>
          )}
        </div>
      )}

      {/* STAY LOGGED IN — TYLKO LOGIN */}
      {isLogin && (
        <label className="auth-checkbox">
          <input
            type="checkbox"
            checked={stayLoggedIn}
            onChange={(e) => setStayLoggedIn(e.target.checked)}
          />
          Stay logged in
        </label>
      )}

      <button type="submit">
        {isLogin ? 'Login' : 'Sign up'}
      </button>

      <p className="auth-switch">
        {isLogin ? (
          <>
            Don’t have an account?{' '}
            <span
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
