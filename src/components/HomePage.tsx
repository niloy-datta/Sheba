import React, { useState } from 'react'
import { districts, districtAreas, mediums } from '../data/bangladeshLocations.js'
import { subjects } from '../data/subjects.js'
import './HomePage.css'

function HomePage({ teachers, onSearch, onTeacherSelect, onViewChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    division: '',
    area: '',
    medium: '',
    subject: '',
    gender: 'all',
    salaryMin: 100,
    salaryMax: 8200,
    availability: 'all'
  })

  const handleDivisionChange = (division) => {
    setFilters({ ...filters, division, area: '' })
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters)
    }
    // Navigate to find tutors page
    if (onViewChange) {
      onViewChange('find-tutors')
    }
  }

  const getAvailableAreas = () => {
    if (!filters.division || !districtAreas[filters.division]) return []
    return districtAreas[filters.division]
  }

  const getAvailableSubjects = () => {
    if (!filters.medium || !subjects[filters.medium]) return []
    const mediumSubjects = subjects[filters.medium]
    const allSubjects = new Set()
    Object.values(mediumSubjects).forEach(level => {
      if (level) {
        Object.keys(level).forEach(sub => allSubjects.add(sub))
      }
    })
    return Array.from(allSubjects)
  }

  // Filter featured tutors - show all teachers, prioritize verified ones
  const featuredTutors = teachers
    .filter(t => {
      const matchesGender = filters.gender === 'all' || !filters.gender || t.gender === filters.gender
      const matchesSalary = !t.pricePerHour ||
        (t.pricePerHour >= filters.salaryMin && t.pricePerHour <= filters.salaryMax)
      const matchesRating = t.rating >= 4.5 || t.rating === 0  // Include new teachers with 0 rating

      return matchesGender && matchesSalary && matchesRating
    })
    .sort((a, b) => {
      // Prioritize verified teachers, then by rating
      if (a.verified !== b.verified) return b.verified - a.verified
      return (b.rating || 0) - (a.rating || 0)
    })
    .slice(0, 6)

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Tuition Media to Bangladesh</h1>
          <p className="hero-subtitle">Modern, user-friendly tuition media website for Bangladesh.</p>

          <div className="hero-search">
            <div className="search-bar-container">
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search Tutors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="hero-filters">
            <select
              className="hero-filter-select"
              value={filters.division}
              onChange={(e) => handleDivisionChange(e.target.value)}
            >
              <option value="">Select Division</option>
              {districts.map(div => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>

            <select
              className="hero-filter-select"
              value={filters.area}
              onChange={(e) => setFilters({ ...filters, area: e.target.value })}
              disabled={!filters.division}
            >
              <option value="">Select Area</option>
              {getAvailableAreas().map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>

            <select
              className="hero-filter-select"
              value={filters.medium}
              onChange={(e) => setFilters({ ...filters, medium: e.target.value, subject: '' })}
            >
              <option value="">Select Medium</option>
              {mediums.map(medium => (
                <option key={medium} value={medium}>{medium}</option>
              ))}
            </select>

            <select
              className="hero-filter-select"
              value={filters.subject}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
              disabled={!filters.medium}
            >
              <option value="">Select Subject</option>
              {getAvailableSubjects().map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <button className="search-button" onClick={() => {
              handleSearch()
              if (onSearch) {
                onSearch(filters)
              }
            }}>
              Search Tutors
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-layout">
        {/* Left Sidebar Filters */}
        <aside className="sidebar-filters">
          <h3>Filters</h3>

          <div className="filter-section">
            <h4>Gender</h4>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="all"
                  checked={filters.gender === 'all'}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                />
                <span>All</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={filters.gender === 'female'}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                />
                <span>Female</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={filters.gender === 'male'}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                />
                <span>Male</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4>Salary Range</h4>
            <div className="salary-range">
              <div className="salary-display">
                <span>৳{filters.salaryMin} BDT - ৳{filters.salaryMax} BDT</span>
              </div>
              <div className="range-inputs">
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={filters.salaryMin}
                  onChange={(e) => setFilters({ ...filters, salaryMin: parseInt(e.target.value) })}
                  className="range-slider"
                />
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={filters.salaryMax}
                  onChange={(e) => setFilters({ ...filters, salaryMax: parseInt(e.target.value) })}
                  className="range-slider"
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h4>Availability</h4>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="availability"
                  value="all"
                  checked={filters.availability === 'all'}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                />
                <span>All time</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="availability"
                  value="morning"
                  checked={filters.availability === 'morning'}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                />
                <span>Morning</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="availability"
                  value="evening"
                  checked={filters.availability === 'evening'}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                />
                <span>Evening</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content-area">
          <h2 className="section-title">Featured Tutors in Your Area</h2>

          <div className="tutors-grid">
            {featuredTutors.map(teacher => (
              <div
                key={teacher.id}
                className="tutor-card"
                onClick={() => onTeacherSelect && onTeacherSelect(teacher)}
              >
                <div className="tutor-image-container">
                  <img
                    src={teacher.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
                    alt={teacher.name}
                    className="tutor-image"
                  />
                  {teacher.verified && (
                    <div className="verified-badge">
                      <span>✓ Verified</span>
                    </div>
                  )}
                </div>

                <div className="tutor-info">
                  <h3 className="tutor-name">{teacher.name}</h3>
                  <div className="tutor-rating">
                    {'⭐'.repeat(5)}
                  </div>
                  <p className="tutor-subjects">
                    {teacher.subjects.slice(0, 2).join(', ')}
                  </p>
                  <p className="tutor-location">
                    {teacher.area || teacher.location}, {teacher.district || teacher.location}
                  </p>
                  <p className="tutor-rate">
                    Hourly rate BDT: <strong>৳{teacher.pricePerHour}</strong>
                  </p>
                  <button className="view-profile-btn">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-links">
            <button className="text-link" onClick={() => onViewChange('about')}>About Us</button>
            <button className="text-link" onClick={() => onViewChange('contact')}>Contact</button>
            <button className="text-link" onClick={() => onViewChange('terms')}>Terms</button>
            <button className="text-link" onClick={() => onViewChange('privacy')}>Privacy</button>
          </div>
          <div className="footer-social">
            <a href="#" className="social-icon">📘</a>
            <a href="#" className="social-icon">🐦</a>
            <a href="#" className="social-icon">📺</a>
          </div>
          <div className="footer-payments">
            <span className="payment-label">Payment Methods:</span>
            <div className="payment-logos">
              <span className="payment-logo">bKash</span>
              <span className="payment-logo">নগদ</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
