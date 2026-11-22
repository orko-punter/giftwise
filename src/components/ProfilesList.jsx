import './ProfilesList.css'

function ProfilesList({ profiles, onSelectProfile, onDeleteProfile, onCreateNew }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="profiles-list">
      <div className="profiles-header">
        <h2>👥 Your Gift Profiles</h2>
        <button onClick={onCreateNew} className="new-profile-button">
          + New Profile
        </button>
      </div>

      {profiles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No profiles yet</h3>
          <p>Create your first gift profile to get started!</p>
          <button onClick={onCreateNew} className="create-first-button">
            Create Your First Profile
          </button>
        </div>
      ) : (
        <div className="profiles-grid">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <div className="profile-header">
                <div className="profile-icon">👤</div>
                <div className="profile-info">
                  <h3 className="profile-name">{profile.name || 'Unnamed'}</h3>
                  {profile.relationship && (
                    <span className="profile-relationship">{profile.relationship}</span>
                  )}
                </div>
              </div>

              <div className="profile-details">
                {profile.age && (
                  <div className="detail-item">
                    <span className="detail-label">Age:</span>
                    <span className="detail-value">{profile.age}</span>
                  </div>
                )}
                {profile.interests && (
                  <div className="detail-item">
                    <span className="detail-label">Interests:</span>
                    <span className="detail-value">{profile.interests}</span>
                  </div>
                )}
                {profile.recommendationHistory && profile.recommendationHistory.length > 0 && (
                  <div className="detail-item">
                    <span className="detail-label">Recommendations:</span>
                    <span className="detail-value">{profile.recommendationHistory.length}</span>
                  </div>
                )}
              </div>

              <div className="profile-footer">
                <div className="profile-date">
                  Updated {formatDate(profile.updatedAt || profile.createdAt)}
                </div>
                <div className="profile-actions">
                  <button
                    onClick={() => onSelectProfile(profile)}
                    className="edit-button"
                  >
                    Edit & Get Gifts
                  </button>
                  <button
                    onClick={() => onDeleteProfile(profile.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProfilesList

