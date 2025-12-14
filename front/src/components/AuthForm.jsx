import { useState } from 'react'

function AuthForm({ onAuthSuccess }) {
  const [mode, setMode] = useState('login')
  const [stayLoggedIn, setStayLoggedIn] = useState(false)

  const isLogin = mode === 'login'

  const handleSubmit = (e) => {
    e.preventDefault()

    // 🔧 tu później backend
    if (stayLoggedIn) {
      localStorage.setItem('isAuthenticated', 'true')
    }

    onAuthSuccess()
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Sign up'}</h2>

      <input type="text" placeholder="Enter your name" />

      <input type="password" placeholder="Enter password" />

      {!isLogin && (
        <input type="password" placeholder="Confirm password" />
      )}

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
