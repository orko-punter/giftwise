// Profile management utilities
// Saves person profiles to localStorage

const USER_PROFILES_KEY = 'giftwise_profiles'

function getProfilesKey(userId) {
  return `${USER_PROFILES_KEY}_${userId}`
}

export function saveProfile(userId, profile) {
  const profiles = getProfiles(userId)
  
  // If profile has an id, update existing; otherwise create new
  if (profile.id) {
    const index = profiles.findIndex(p => p.id === profile.id)
    if (index !== -1) {
      profiles[index] = { ...profile, updatedAt: Date.now() }
    } else {
      profiles.push({ ...profile, id: profile.id, createdAt: Date.now(), updatedAt: Date.now() })
    }
  } else {
    // Create new profile with unique ID
    const newProfile = {
      ...profile,
      id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    profiles.push(newProfile)
  }
  
  localStorage.setItem(getProfilesKey(userId), JSON.stringify(profiles))
  return profile.id || profiles[profiles.length - 1].id
}

export function getProfiles(userId) {
  const profilesStr = localStorage.getItem(getProfilesKey(userId))
  if (profilesStr) {
    try {
      return JSON.parse(profilesStr)
    } catch (e) {
      return []
    }
  }
  return []
}

export function getProfile(userId, profileId) {
  const profiles = getProfiles(userId)
  return profiles.find(p => p.id === profileId) || null
}

export function deleteProfile(userId, profileId) {
  const profiles = getProfiles(userId)
  const filtered = profiles.filter(p => p.id !== profileId)
  localStorage.setItem(getProfilesKey(userId), JSON.stringify(filtered))
}

export function saveRecommendationHistory(userId, profileId, recommendations, formData) {
  const profile = getProfile(userId, profileId)
  if (profile) {
    const history = profile.recommendationHistory || []
    history.push({
      id: `rec_${Date.now()}`,
      recommendations,
      formData,
      date: Date.now()
    })
    profile.recommendationHistory = history
    saveProfile(userId, profile)
  }
}

