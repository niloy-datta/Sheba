import React, { useState } from 'react'
import BangladeshSearchFilters from './BangladeshSearchFilters'
import './TeachersList.css'

function TeachersList({ teachers, onTeacherSelect, onCreateProfile }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    district: '',
    area: '',
    medium: '',
    classes: [],
    subjects: [],
    location: '',
    priceRange: '',
    verifiedOnly: false,
    minRating: '0',
    experience: '',
    sortBy: 'rating',
    gender: 'all',
    salaryMin: 100,
    salaryMax: 10000
  })

  const filteredTeachers = teachers.filter(teacher => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase())) ||
      teacher.title?.toLowerCase().includes(searchTerm.toLowerCase())

    // District filter
    const matchesDistrict = !filters.district || 
      teacher.district?.toLowerCase() === filters.district.toLowerCase() ||
      teacher.location?.toLowerCase().includes(filters.district.toLowerCase())

    // Area filter
    const matchesArea = !filters.area || 
      teacher.area?.toLowerCase() === filters.area.toLowerCase() ||
      teacher.location?.toLowerCase().includes(filters.area.toLowerCase())

    // Medium filter
    const matchesMedium = !filters.medium || 
      filters.medium === 'সব মিডিয়াম' ||
      (Array.isArray(teacher.medium) && teacher.medium.includes(filters.medium)) ||
      teacher.medium === filters.medium

    // Class filter
    const matchesClass = filters.classes.length === 0 ||
      filters.classes.some(c => teacher.classes.some(tc => tc.includes(c) || tc.includes(`Class ${c}`)))

    // Subject filter
    const matchesSubject = filters.subjects.length === 0 ||
      filters.subjects.some(s => teacher.subjects.includes(s))

    // Location filter (legacy support)
    const matchesLocation = !filters.location || 
      teacher.location?.toLowerCase().includes(filters.location.toLowerCase())

    // Price range filter
    const matchesPrice = !filters.priceRange || (() => {
      if (!teacher.pricePerHour) return false
      const [min, max] = filters.priceRange.split('-').map(Number)
      return teacher.pricePerHour >= min && teacher.pricePerHour <= max
    })()
    
    // Salary range filter (from sidebar)
    const matchesSalaryRange = !teacher.pricePerHour || 
      (teacher.pricePerHour >= (filters.salaryMin || 0) && 
       teacher.pricePerHour <= (filters.salaryMax || 10000))

    // Rating filter
    const matchesRating = parseFloat(teacher.rating) >= parseFloat(filters.minRating)

    // Verified filter
    const matchesVerified = !filters.verifiedOnly || teacher.verified

    // Gender filter
    const matchesGender = !filters.gender || 
      filters.gender === 'all' || 
      teacher.gender === filters.gender

    // Experience filter
    const matchesExperience = !filters.experience || (() => {
      if (!teacher.experience) return false
      const exp = teacher.experience
      if (filters.experience === '0-5') return exp >= 0 && exp < 5
      if (filters.experience === '5-10') return exp >= 5 && exp < 10
      if (filters.experience === '10-15') return exp >= 10 && exp < 15
      if (filters.experience === '15+') return exp >= 15
      return true
    })()

    return matchesSearch && matchesDistrict && matchesArea && matchesMedium && 
           matchesClass && matchesSubject && matchesLocation && 
           matchesPrice && matchesSalaryRange && matchesRating && matchesVerified && matchesGender && matchesExperience
  })

  // Sort teachers
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (filters.sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0)
    } else if (filters.sortBy === 'price-low') {
      return (a.pricePerHour || 0) - (b.pricePerHour || 0)
    } else if (filters.sortBy === 'price-high') {
      return (b.pricePerHour || 0) - (a.pricePerHour || 0)
    } else if (filters.sortBy === 'students') {
      return (b.students || 0) - (a.students || 0)
    } else if (filters.sortBy === 'experience') {
      return (b.experience || 0) - (a.experience || 0)
    }
    return 0
  })

  const handleTeacherClick = (teacher) => {
    if (onTeacherSelect) {
      onTeacherSelect(teacher)
    }
  }

  return (
    <div className="teachers-list">
      <div className="teachers-header">
        <h2>আমাদের শিক্ষকবৃন্দ</h2>
        <div className="header-actions-teachers">
          <button 
            className="become-teacher-button"
            onClick={() => {
              if (onCreateProfile) {
                onCreateProfile()
              }
            }}
          >
            + শিক্ষক হন
          </button>
          <div className="search-box">
            <input
              type="text"
              placeholder="শিক্ষক বা বিষয় খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <BangladeshSearchFilters filters={filters} onFilterChange={setFilters} />

      <div className="results-info">
        <p>মোট {sortedTeachers.length} জন শিক্ষক পাওয়া গেছে</p>
      </div>

      <div className="teachers-grid">
        {sortedTeachers.length === 0 ? (
          <div className="no-results">
            <p>কোন শিক্ষক পাওয়া যায়নি। অনুগ্রহ করে ফিল্টার পরিবর্তন করুন।</p>
          </div>
        ) : (
          sortedTeachers.map(teacher => (
            <div 
              key={teacher.id} 
              className="teacher-card-mini"
              onClick={() => handleTeacherClick(teacher)}
            >
            <div className="teacher-avatar-mini">
              <img src={teacher.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'} alt={teacher.name} />
            </div>
            <div className="teacher-info-mini">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h3 className="teacher-name-mini">{teacher.name}</h3>
                {teacher.verified && (
                  <span className="verified-badge" title="যাচাইকৃত শিক্ষক">✓</span>
                )}
              </div>
              <p className="teacher-title-mini">{teacher.title}</p>
              {teacher.location && (
                <p className="teacher-location">📍 {teacher.location}</p>
              )}
              <div className="teacher-subjects-mini">
                {teacher.subjects.slice(0, 2).map((subject, idx) => (
                  <span key={idx} className="subject-tag">{subject}</span>
                ))}
                {teacher.subjects.length > 2 && (
                  <span className="subject-tag">+{teacher.subjects.length - 2}</span>
                )}
              </div>
              {teacher.pricePerHour && (
                <div className="teacher-price">
                  <strong>{teacher.pricePerHour} টাকা/ঘণ্টা</strong>
                </div>
              )}
              <div className="teacher-stats-mini">
                <span>⭐ {teacher.rating}</span>
                <span>👥 {teacher.students}+</span>
                <span>🎥 {teacher.videos}+</span>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TeachersList
