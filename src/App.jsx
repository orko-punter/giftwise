import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import GiftForm from './components/GiftForm'
import GiftResults from './components/GiftResults'
import ProfilesList from './components/ProfilesList'
import { getRecommendations } from './utils/recommendationEngine'
import { login, signup, logout, getCurrentUser, isAuthenticated } from './utils/auth'
import { getProfiles, saveProfile, deleteProfile, saveRecommendationHistory } from './utils/profileManager'

function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('login') // 'login', 'profiles', 'form', 'results'
  const [profiles, setProfiles] = useState([])
  const [recommendations, setRecommendations] = useState(null)
  const [formData, setFormData] = useState(null)
  const [editingProfile, setEditingProfile] = useState(null)

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      loadProfiles(currentUser.id)
      setView('profiles')
    }
  }, [])

  const loadProfiles = (userId) => {
    const userProfiles = getProfiles(userId)
    setProfiles(userProfiles)
  }

  const handleLogin = (email, password) => {
    const result = login(email, password)
    if (result.success) {
      setUser(result.user)
      loadProfiles(result.user.id)
      setView('profiles')
      return result
    }
    return result
  }

  const handleSignup = (email, password, name) => {
    const result = signup(email, password, name)
    if (result.success) {
      setUser(result.user)
      loadProfiles(result.user.id)
      setView('profiles')
      return result
    }
    return result
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setProfiles([])
    setView('login')
    setRecommendations(null)
    setFormData(null)
    setEditingProfile(null)
  }

  const handleCreateNew = () => {
    setEditingProfile(null)
    setView('form')
  }

  const handleSelectProfile = (profile) => {
    setEditingProfile(profile)
    setView('form')
  }

  const handleDeleteProfile = (profileId) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(user.id, profileId)
      loadProfiles(user.id)
    }
  }

  const handleSaveProfile = (profileData) => {
    const profileId = saveProfile(user.id, profileData)
    loadProfiles(user.id)
    // Update editingProfile if we're editing
    if (profileData.id) {
      setEditingProfile({ ...profileData, id: profileId })
    }
  }

  const handleFormSubmit = async (data) => {
    const recs = await getRecommendations(data)
    setRecommendations(recs)
    setFormData(data)

    // Save recommendation history if we have a profile
    if (data.profileId) {
      saveRecommendationHistory(user.id, data.profileId, recs, data)
    } else if (data.name) {
      // Create new profile and save history
      const profileData = {
        name: data.name,
        ...data.person,
        ...data.event
      }
      const profileId = saveProfile(user.id, profileData)
      saveRecommendationHistory(user.id, profileId, recs, data)
      loadProfiles(user.id)
    }

    setView('results')
  }

  const handleReset = () => {
    setRecommendations(null)
    setFormData(null)
    setView('profiles')
  }

  const handleBackToProfiles = () => {
    setEditingProfile(null)
    setView('profiles')
  }

  // Show login if not authenticated
  if (!user) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🎁 GiftWise</h1>
          <p className="subtitle">Find the perfect gift, with as much or as little information as you have</p>
        </header>
        <main className="app-main">
          <Login onLogin={handleLogin} onSignup={handleSignup} />
        </main>
        <footer className="app-footer">
          <p>Made with ❤️ for thoughtful gift giving</p>
        </footer>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>🎁 GiftWise</h1>
            <p className="subtitle">Find the perfect gift, with as much or as little information as you have</p>
          </div>
          <div className="header-actions">
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {view === 'profiles' && (
          <ProfilesList
            profiles={profiles}
            onSelectProfile={handleSelectProfile}
            onDeleteProfile={handleDeleteProfile}
            onCreateNew={handleCreateNew}
          />
        )}

        {view === 'form' && (
          <div>
            <div className="form-header">
              <button onClick={handleBackToProfiles} className="back-button">
                ← Back to Profiles
              </button>
              <h2>{editingProfile ? 'Edit Profile & Get Recommendations' : 'Create New Gift Profile'}</h2>
            </div>
            <GiftForm
              onSubmit={handleFormSubmit}
              initialProfile={editingProfile}
              onSaveProfile={handleSaveProfile}
            />
          </div>
        )}

        {view === 'results' && (
          <GiftResults
            recommendations={recommendations}
            formData={formData}
            onReset={handleReset}
            onBackToProfiles={handleBackToProfiles}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ for thoughtful gift giving</p>
      </footer>
    </div>
  )
}

export default App
