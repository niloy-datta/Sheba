import React, { useState } from 'react'
import BangladeshSearchFilters from './BangladeshSearchFilters'
import BookingModal from './BookingModal'
import Calendar from './Calendar'
import './StudentDashboard.css'

interface Teacher {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  students: number;
  pricePerHour: number;
  classes: string[];
  subjects: string[];
  district: string;
  area: string;
  location: string;
  verified: boolean;
  avatar?: string;
  medium?: string | string[];
  gender?: string;
  experience?: number;
}

interface User {
  id: string;
  name: string;
  [key: string]: any;
}

interface StudentDashboardProps {
  teachers: Teacher[];
  user: User | null;
  onBookingSubmit: (booking: any) => void;
}

interface Filters {
  district: string;
  area: string;
  medium: string;
  classes: string[];
  subjects: string[];
  location: string;
  priceRange: string;
  verifiedOnly: boolean;
  minRating: string;
  experience: string;
  sortBy: string;
  gender: string;
  salaryMin: number;
  salaryMax: number;
}

function StudentDashboard({ teachers, user, onBookingSubmit }: StudentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Filters>({
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
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [myBookings, setMyBookings] = useState<any[]>([])

  const filteredTeachers = teachers.filter(teacher => {
    // Search term filter
    const matchesSearch = searchTerm === '' ||
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (teacher.title && teacher.title.toLowerCase().includes(searchTerm.toLowerCase()))

    // District filter
    const matchesDistrict = !filters.district ||
      (teacher.district && teacher.district.toLowerCase() === filters.district.toLowerCase()) ||
      (teacher.location && teacher.location.toLowerCase().includes(filters.district.toLowerCase()))

    // Area filter
    const matchesArea = !filters.area ||
      (teacher.area && teacher.area.toLowerCase() === filters.area.toLowerCase()) ||
      (teacher.location && teacher.location.toLowerCase().includes(filters.area.toLowerCase()))

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

    // Price range filter
    const matchesPrice = !filters.priceRange || (() => {
      if (!teacher.pricePerHour) return false
      const [min, max] = filters.priceRange.split('-').map(Number)
      return teacher.pricePerHour >= min && teacher.pricePerHour <= max
    })()

    // Salary range filter
    const matchesSalaryRange = !teacher.pricePerHour ||
      (teacher.pricePerHour >= (filters.salaryMin || 0) &&
        teacher.pricePerHour <= (filters.salaryMax || 10000))

    // Rating filter
    const matchesRating = parseFloat(teacher.rating.toString()) >= parseFloat(filters.minRating)

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
      matchesClass && matchesSubject && matchesPrice && matchesSalaryRange &&
      matchesRating && matchesVerified && matchesGender && matchesExperience
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

  const handleBookTeacher = (teacher: Teacher) => {
    if (!user) {
      alert('দয়া করে প্রথমে লগইন করুন')
      return
    }
    setSelectedTeacher(teacher)
    setShowBookingModal(true)
  }

  const handleBookingSubmit = (bookingData: any) => {
    const newBooking = {
      id: `booking_${Date.now()}`,
      ...bookingData,
      studentId: user?.id,
      studentName: user?.name,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    setMyBookings([...myBookings, newBooking])

    if (onBookingSubmit) {
      onBookingSubmit(newBooking)
    }

    setShowBookingModal(false)
    setSelectedTeacher(null)

    alert('আপনার অনুরোধ সফলভাবে পাঠানো হয়েছে! শিক্ষক শীঘ্রই আপনার সাথে যোগাযোগ করবেন।')
  }

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>শিক্ষক খুঁজুন</h1>
        <p>আপনার প্রয়োজন অনুযায়ী সেরা শিক্ষক খুঁজে নিন</p>
      </div>

      <div className="search-section">
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="main-search-input"
            placeholder="শিক্ষকের নাম, বিষয় বা কোথাও খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon-main">🔍</span>
        </div>
      </div>

      <BangladeshSearchFilters filters={filters} onFilterChange={setFilters} />

      <div className="results-section">
        <div className="results-header">
          <h2>খুঁজে পাওয়া শিক্ষক ({sortedTeachers.length})</h2>
          <select
            className="sort-select"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="rating">সর্বোচ্চ রেটিং</option>
            <option value="price-low">কম মূল্য</option>
            <option value="price-high">বেশি মূল্য</option>
            <option value="students">সবচেয়ে শিক্ষার্থী</option>
            <option value="experience">অভিজ্ঞতা</option>
          </select>
        </div>

        {sortedTeachers.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>কোন শিক্ষক পাওয়া যায়নি</h3>
            <p>অনুগ্রহ করে আপনার ফিল্টার পরিবর্তন করুন বা নতুন সার্চ করুন</p>
          </div>
        ) : (
          <div className="teachers-grid-dashboard">
            {sortedTeachers.map(teacher => (
              <div key={teacher.id} className="teacher-card-dashboard">
                <div className="teacher-header-card">
                  <div className="teacher-avatar-card">
                    <img
                      src={teacher.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
                      alt={teacher.name}
                    />
                    {teacher.verified && (
                      <span className="verified-badge-card">✓ Verified</span>
                    )}
                  </div>
                  <div className="teacher-basic-info">
                    <h3>{teacher.name}</h3>
                    <p className="teacher-title-card">{teacher.title}</p>
                    <div className="teacher-rating-card">
                      <span className="stars">⭐</span>
                      <span className="rating-value">{teacher.rating}</span>
                      <span className="reviews-count">({teacher.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="teacher-details-card">
                  <div className="detail-row">
                    <span className="detail-label">📍 অবস্থান:</span>
                    <span className="detail-value">{teacher.area || teacher.location}, {teacher.district || teacher.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📚 বিষয়:</span>
                    <span className="detail-value">{teacher.subjects.join(', ')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🎓 ক্লাস:</span>
                    <span className="detail-value">{teacher.classes.join(', ')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💰 মূল্য:</span>
                    <span className="detail-value price-highlight">৳{teacher.pricePerHour}/ঘণ্টা</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">⭐ রেটিং:</span>
                    <span className="detail-value">{teacher.rating} ({teacher.students}+ students)</span>
                  </div>
                </div>

                <div className="teacher-actions-card">
                  <button
                    className="view-profile-btn-card"
                    onClick={() => {
                      // Navigate to teacher profile
                      if (window.location) {
                        window.location.hash = `teacher-${teacher.id}`
                      }
                    }}
                  >
                    প্রোফাইল দেখুন
                  </button>
                  <button
                    className="book-now-btn"
                    onClick={() => handleBookTeacher(teacher)}
                  >
                    এখনই বুক করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBookingModal && selectedTeacher && (
        <BookingModal
          teacher={selectedTeacher}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedTeacher(null)
          }}
          onSubmit={handleBookingSubmit}
        />
      )}

      {/* My Bookings Section */}
      {myBookings.length > 0 && (
        <div className="my-bookings-section">
          <h2>আমার বুকিং এবং ক্যালেন্ডার</h2>
          <div className="bookings-container">
            <div className="calendar-wrapper">
              <Calendar
                events={myBookings}
                onDateClick={(date) => {
                  // Filter booking list by date if needed, or just highlight
                  // For now we just console log
                  console.log('Selected date:', date)
                }}
              />
            </div>
            <div className="bookings-list-wrapper">
              <h3>আসন্ন ক্লাস</h3>
              <div className="bookings-list">
                {myBookings
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map(booking => (
                    <div key={booking.id} className="booking-item">
                      <div className="booking-info">
                        <h4>{booking.tutorName}</h4>
                        <p>বিষয়: {booking.subject}</p>
                        <p>ক্লাস: {booking.classLevel}</p>
                        <div className="booking-datetime">
                          <span className="date-badge">📅 {booking.date}</span>
                          <span className="time-badge">⏰ {booking.time}</span>
                        </div>
                        <p>মূল্য: ৳{booking.price}</p>
                      </div>
                      <div className="booking-status">
                        <span className={`status-badge ${booking.status}`}>
                          {booking.status === 'pending' && '⏳ অপেক্ষমান'}
                          {booking.status === 'accepted' && '✓ গ্রহণ করা হয়েছে'}
                          {booking.status === 'rejected' && '✗ প্রত্যাখ্যান'}
                          {booking.status === 'completed' && '✓ সম্পন্ন'}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentDashboard
