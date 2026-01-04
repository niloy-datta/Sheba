import React, { useState } from 'react'
import './BookingModal.css'

interface BookingModalProps {
  teacher: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function BookingModal({ teacher, onClose, onSubmit }: BookingModalProps) {
  const [formData, setFormData] = useState({
    subject: teacher?.subjects[0] || '',
    classLevel: '',
    date: '',
    time: '',
    duration: 1,
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({
        ...formData,
        tutorId: teacher.id,
        tutorName: teacher.name,
        price: teacher.pricePerHour * formData.duration
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>শিক্ষক বুক করুন</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="teacher-info-summary">
          <img src={teacher.avatar} alt={teacher.name} />
          <div>
            <h3>{teacher.name}</h3>
            <p>{teacher.title}</p>
            <p className="price-display">{teacher.pricePerHour} টাকা/ঘণ্টা</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>বিষয় *</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              {teacher.subjects.map((subject: string) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>ক্লাস *</label>
            <select
              name="classLevel"
              value={formData.classLevel}
              onChange={handleChange}
              required
            >
              <option value="">ক্লাস নির্বাচন করুন</option>
              {teacher.classes.map((cls: string) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>তারিখ *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>সময় *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>কত ঘণ্টা? *</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="1">১ ঘণ্টা</option>
              <option value="1.5">১.৫ ঘণ্টা</option>
              <option value="2">২ ঘণ্টা</option>
              <option value="2.5">২.৫ ঘণ্টা</option>
              <option value="3">৩ ঘণ্টা</option>
            </select>
          </div>

          <div className="form-group">
            <label>বার্তা (ঐচ্ছিক)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="শিক্ষকের কাছে আপনার বার্তা..."
              rows={4}
            />
          </div>

          <div className="price-calculation">
            <div className="price-breakdown">
              <span>মূল্য ({formData.duration} ঘণ্টা × {teacher.pricePerHour} টাকা)</span>
              <strong>{teacher.pricePerHour * formData.duration} টাকা</strong>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              বাতিল
            </button>
            <button type="submit" className="submit-button">
              অনুরোধ পাঠান
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingModal
