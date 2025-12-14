import { useState } from 'react'
import './AuthForm.css' 

function AuthForm({ onAuthSuccess }) {
  const [mode, setMode] = useState('login')
  const [stayLoggedIn, setStayLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({})

  const isLogin = mode === 'login'

  const handleSubmit = (e) => {
    e.preventDefault()
    
    setError({})

    if (!password) {
      setError({ password: 'Password is required' })
      return
    }

    if (password.length < 5) {
      setError({ password: 'Password must be at least 5 characters long' })
      return
    }

    if (/*!isLogin && */password !== confirmPassword) {
      setError({ confirmPassword: 'Passwords do not match' })
      return
    }

    // 🔧 tu później backend
    if (stayLoggedIn) {
      localStorage.setItem('isAuthenticated', 'true')
    }

    onAuthSuccess()
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Sign up'}</h2>

      <input 
        type="text" 
        placeholder="Enter your name" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="password-field">
        <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(prev => !prev)}
            aria-label="Toggle password visibility"
        >
            {showPassword ? '🙈' : '👁️'}
        </button>

        {error.password && (
          <div className="auth-error">
            {error.password}
          </div>
        )}
      </div>

      <div className="password-field">
        <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={error.password ? 'input-error' : ''}             // <--- do ogarnięcia
        />
        <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(prev => !prev)}
            aria-label="Toggle confirm password visibility"
        >
            {showConfirmPassword ? '🙈' : '👁️'}
        </button>

        {error.confirmPassword && (
        <div className="auth-error">
          {error.confirmPassword}
        </div>
  )}
      </div>


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
            <span onClick={() => setMode('signup')}>Sign up</span>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <span onClick={() => setMode('login')}>Login</span>
          </>
        )}
      </p>
    </form>
  )
}

export default AuthForm
