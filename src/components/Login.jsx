import { useState } from 'react'
import './Login.css'

function Login({ onLogin, onSignup }) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (isSignup) {
      const result = onSignup(email, password, name)
      if (!result.success) {
        setError(result.error || 'Signup failed')
      }
    } else {
      const result = onLogin(email, password)
      if (!result.success) {
        setError(result.error || 'Login failed')
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="login-subtitle">
          {isSignup 
            ? 'Sign up to save gift profiles for your friends and family'
            : 'Sign in to access your saved gift profiles'
          }
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="login-switch">
          <p>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              className="link-button"
              onClick={() => {
                setIsSignup(!isSignup)
                setError('')
                setEmail('')
                setPassword('')
                setName('')
              }}
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="login-note">
          <p>💡 This is a demo app. Any email/password combination will work for testing.</p>
        </div>
      </div>
    </div>
  )
}

export default Login

