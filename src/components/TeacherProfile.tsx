import React, { useState } from 'react'
import BookingModal from './BookingModal'
import './TeacherProfile.css'

function TeacherProfile({ teacher, onBookingSubmit }) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  if (!teacher) {
    return null
  }

  const handleBookingSubmit = (bookingData) => {
    if (onBookingSubmit) {
      onBookingSubmit(bookingData)
    }
    setShowBookingModal(false)
    // Show success message
    alert('আপনার অনুরোধ সফলভাবে পাঠানো হয়েছে! শিক্ষক শীঘ্রই আপনার সাথে যোগাযোগ করবেন।')
  }

  return (
    <div className="teacher-profile">
      <div className="teacher-card">
        <div className="teacher-header">
          <div className="teacher-avatar">
            <img src={teacher.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'} alt={teacher.name} />
          </div>
          <div className="teacher-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h2 className="teacher-name">{teacher.name}</h2>
              {teacher.verified && (
                <span className="verified-badge-large" title="যাচাইকৃত শিক্ষক">
                  ✓ যাচাইকৃত
                </span>
              )}
            </div>
            <p className="teacher-title">{teacher.title}</p>
            {teacher.location && (
              <p className="teacher-location-large">📍 {teacher.location}</p>
            )}
            {teacher.pricePerHour && (
              <div className="teacher-price-large">
                <strong>{teacher.pricePerHour} টাকা/ঘণ্টা</strong>
              </div>
            )}
            <div className="teacher-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-value">{teacher.rating}</span>
              <span className="reviews">({teacher.reviews} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="teacher-details">
          <div className="detail-item">
            <strong>বিষয়:</strong> {teacher.subjects.join(', ')}
          </div>
          <div className="detail-item">
            <strong>ক্লাস:</strong> {teacher.classes.join(', ')}
          </div>
          <div className="detail-item">
            <strong>অভিজ্ঞতা:</strong> {teacher.experience} বছর
          </div>
          <div className="detail-item">
            <strong>শিক্ষার্থী:</strong> {teacher.students}+
          </div>
          <div className="detail-item">
            <strong>ভিডিও:</strong> {teacher.videos}+
          </div>
        </div>

        <div className="teacher-bio">
          <h3>শিক্ষক সম্পর্কে</h3>
          <p>{teacher.bio}</p>
        </div>

        <div className="teacher-qualifications">
          <h3>যোগ্যতা</h3>
          <ul>
            {teacher.qualifications.map((qual, index) => (
              <li key={index}>{qual}</li>
            ))}
          </ul>
        </div>

        {teacher.available && (
          <div className="teacher-actions">
            <button 
              className="book-button"
              onClick={() => setShowBookingModal(true)}
            >
              📅 শিক্ষক বুক করুন
            </button>
            <button className="contact-button">
              💬 যোগাযোগ করুন
            </button>
          </div>
        )}
      </div>

      {showBookingModal && (
        <BookingModal
          teacher={teacher}
          onClose={() => setShowBookingModal(false)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  )
}

export default TeacherProfile
