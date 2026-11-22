// Simple authentication utility using localStorage
// In a real app, this would connect to a backend

const AUTH_KEY = 'giftwise_user'
const USER_PROFILES_KEY = 'giftwise_profiles'

export function login(email, password) {
  // Simple mock authentication - in production, this would call an API
  // For demo purposes, any email/password combination works
  if (email && password) {
    const user = {
      email,
      id: email.split('@')[0], // Simple ID generation
      loginTime: Date.now()
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    return { success: true, user }
  }
  return { success: false, error: 'Email and password required' }
}

export function signup(email, password, name) {
  // Simple mock signup - in production, this would call an API
  if (email && password && name) {
    const user = {
      email,
      name,
      id: email.split('@')[0],
      signupTime: Date.now()
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    // Initialize empty profiles for new user
    localStorage.setItem(`${USER_PROFILES_KEY}_${user.id}`, JSON.stringify([]))
    return { success: true, user }
  }
  return { success: false, error: 'All fields required' }
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}

export function getCurrentUser() {
  const userStr = localStorage.getItem(AUTH_KEY)
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch (e) {
      return null
    }
  }
  return null
}

export function isAuthenticated() {
  return getCurrentUser() !== null
}

