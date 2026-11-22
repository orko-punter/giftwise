import { useState, useEffect } from 'react'
import './GiftForm.css'

function GiftForm({ onSubmit, initialProfile = null, onSaveProfile = null }) {
  const [personInfo, setPersonInfo] = useState({
    name: '',
    age: '',
    gender: '',
    interests: '',
    hobbies: '',
    relationship: '',
    personality: '',
    lifestyle: ''
  })

  const [eventInfo, setEventInfo] = useState({
    occasion: '',
    budget: '',
    date: '',
    location: '',
    theme: ''
  })

  // Load initial profile if provided
  useEffect(() => {
    if (initialProfile) {
      setPersonInfo({
        name: initialProfile.name || '',
        age: initialProfile.age || '',
        gender: initialProfile.gender || '',
        interests: initialProfile.interests || '',
        hobbies: initialProfile.hobbies || '',
        relationship: initialProfile.relationship || '',
        personality: initialProfile.personality || '',
        lifestyle: initialProfile.lifestyle || ''
      })
      setEventInfo({
        occasion: initialProfile.occasion || '',
        budget: initialProfile.budget || '',
        date: initialProfile.date || '',
        location: initialProfile.location || '',
        theme: initialProfile.theme || ''
      })
    }
  }, [initialProfile])

  const handlePersonChange = (field, value) => {
    setPersonInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleEventChange = (field, value) => {
    setEventInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: personInfo.name.trim(),
      person: Object.fromEntries(
        Object.entries(personInfo).filter(([k, v]) => k !== 'name' && v.trim() !== '')
      ),
      event: Object.fromEntries(
        Object.entries(eventInfo).filter(([_, v]) => v.trim() !== '')
      ),
      profileId: initialProfile?.id || null
    }
    
    // Save profile if name is provided and onSaveProfile callback exists
    if (data.name && onSaveProfile) {
      const profileData = {
        id: initialProfile?.id || null,
        name: data.name,
        ...data.person,
        ...data.event
      }
      onSaveProfile(profileData)
    }
    
    onSubmit(data)
  }

  return (
    <form className="gift-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2 className="section-title">
          <span className="icon">👤</span>
          About the Person (Optional)
        </h2>
        <p className="section-description">
          Share any information you know about the gift recipient. All fields are optional!
        </p>
        
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="name">Name <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              placeholder="e.g., John, Sarah, Mom"
              value={personInfo.name}
              onChange={(e) => handlePersonChange('name', e.target.value)}
              required
            />
            <p className="field-hint">The name of the person you're buying a gift for</p>
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              placeholder="e.g., 25"
              value={personInfo.age}
              onChange={(e) => handlePersonChange('age', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={personInfo.gender}
              onChange={(e) => handlePersonChange('gender', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="relationship">Relationship</label>
            <select
              id="relationship"
              value={personInfo.relationship}
              onChange={(e) => handlePersonChange('relationship', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="colleague">Colleague</option>
              <option value="partner">Partner</option>
              <option value="acquaintance">Acquaintance</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="interests">Interests</label>
            <input
              type="text"
              id="interests"
              placeholder="e.g., photography, cooking, travel, music"
              value={personInfo.interests}
              onChange={(e) => handlePersonChange('interests', e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="hobbies">Hobbies</label>
            <input
              type="text"
              id="hobbies"
              placeholder="e.g., hiking, reading, gaming, painting"
              value={personInfo.hobbies}
              onChange={(e) => handlePersonChange('hobbies', e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="personality">Personality Traits</label>
            <input
              type="text"
              id="personality"
              placeholder="e.g., adventurous, introverted, creative, practical"
              value={personInfo.personality}
              onChange={(e) => handlePersonChange('personality', e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="lifestyle">Lifestyle</label>
            <input
              type="text"
              id="lifestyle"
              placeholder="e.g., minimalist, tech-savvy, outdoor enthusiast, homebody"
              value={personInfo.lifestyle}
              onChange={(e) => handlePersonChange('lifestyle', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">
          <span className="icon">🎉</span>
          About the Event (Optional)
        </h2>
        <p className="section-description">
          Tell us about the occasion. Again, all fields are optional!
        </p>

        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              value={eventInfo.occasion}
              onChange={(e) => handleEventChange('occasion', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="wedding">Wedding</option>
              <option value="graduation">Graduation</option>
              <option value="holiday">Holiday (Christmas, etc.)</option>
              <option value="baby-shower">Baby Shower</option>
              <option value="housewarming">Housewarming</option>
              <option value="retirement">Retirement</option>
              <option value="thank-you">Thank You</option>
              <option value="just-because">Just Because</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <select
              id="budget"
              value={eventInfo.budget}
              onChange={(e) => handleEventChange('budget', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="under-25">Under $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-250">$100 - $250</option>
              <option value="250-500">$250 - $500</option>
              <option value="500-plus">$500+</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={eventInfo.date}
              onChange={(e) => handleEventChange('date', e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="location">Location/Setting</label>
            <input
              type="text"
              id="location"
              placeholder="e.g., outdoor party, formal dinner, casual gathering"
              value={eventInfo.location}
              onChange={(e) => handleEventChange('location', e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="theme">Theme or Style</label>
            <input
              type="text"
              id="theme"
              placeholder="e.g., elegant, fun, practical, sentimental"
              value={eventInfo.theme}
              onChange={(e) => handleEventChange('theme', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          Get Gift Recommendations 🎁
        </button>
        <p className="form-note">
          💡 Tip: The name is required to save this profile. All other fields are optional - 
          fill in as much or as little information as you have!
        </p>
      </div>
    </form>
  )
}

export default GiftForm

