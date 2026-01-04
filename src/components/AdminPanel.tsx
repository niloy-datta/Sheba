import React, { useState } from 'react'
import './AdminPanel.css'

interface AdminPanelProps {
  teachers: any[];
  bookings: any[];
  onVerifyTeacher: (teacherId: any, status: string) => void;
  onApproveBooking: (bookingId: string) => void;
}

function AdminPanel({ teachers, bookings, onVerifyTeacher, onApproveBooking }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('verifications')

  // Pending verifications (tutors not yet verified)
  const pendingVerifications = teachers.filter((t: any) => !t.verified)

  // Pending bookings
  const pendingBookings = bookings?.filter((b: any) => b.status === 'pending') || []

  const handleVerify = (teacherId: any, status: string) => {
    if (onVerifyTeacher) {
      onVerifyTeacher(teacherId, status)
    }
  }

  const handleApproveBooking = (bookingId: string) => {
    if (onApproveBooking) {
      onApproveBooking(bookingId)
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>অ্যাডমিন প্যানেল</h1>
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'verifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('verifications')}
          >
            যাচাইকরণ ({pendingVerifications.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            বুকিং ({pendingBookings.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'teachers' ? 'active' : ''}`}
            onClick={() => setActiveTab('teachers')}
          >
            সব শিক্ষক ({teachers.length})
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'verifications' && (
          <div className="verifications-section">
            <h2>যাচাইকরণের জন্য অপেক্ষমান শিক্ষক</h2>
            {pendingVerifications.length === 0 ? (
              <p className="empty-state">কোন অপেক্ষমান যাচাইকরণ নেই</p>
            ) : (
              <div className="verification-list">
                {pendingVerifications.map(teacher => (
                  <div key={teacher.id} className="verification-card">
                    <div className="teacher-preview-admin">
                      <img src={teacher.avatar} alt={teacher.name} />
                      <div>
                        <h3>{teacher.name}</h3>
                        <p>{teacher.title}</p>
                        <p>📧 {teacher.email || 'N/A'}</p>
                        <p>📞 {teacher.phone || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="qualifications-preview">
                      <strong>যোগ্যতা:</strong>
                      <ul>
                        {teacher.qualifications.map((qual: string, idx: number) => (
                          <li key={idx}>{qual}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="verification-actions">
                      <button
                        className="approve-button"
                        onClick={() => handleVerify(teacher.id, 'verified')}
                      >
                        ✓ অনুমোদন করুন
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleVerify(teacher.id, 'rejected')}
                      >
                        ✗ প্রত্যাখ্যান করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h2>অপেক্ষমান বুকিং</h2>
            {pendingBookings.length === 0 ? (
              <p className="empty-state">কোন অপেক্ষমান বুকিং নেই</p>
            ) : (
              <div className="bookings-list">
                {pendingBookings.map(booking => (
                  <div key={booking.id} className="booking-card-admin">
                    <div className="booking-info">
                      <h3>{booking.studentName}</h3>
                      <p>শিক্ষক: {booking.tutorName}</p>
                      <p>বিষয়: {booking.subject}</p>
                      <p>ক্লাস: {booking.classLevel}</p>
                      <p>তারিখ: {booking.date}</p>
                      <p>সময়: {booking.time}</p>
                      <p>মূল্য: {booking.price} টাকা</p>
                    </div>
                    <div className="booking-actions">
                      <button
                        className="approve-button"
                        onClick={() => handleApproveBooking(booking.id)}
                      >
                        ✓ অনুমোদন করুন
                      </button>
                      <button className="reject-button">
                        ✗ প্রত্যাখ্যান করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="teachers-section">
            <h2>সব শিক্ষক</h2>
            <div className="teachers-table">
              <table>
                <thead>
                  <tr>
                    <th>নাম</th>
                    <th>বিষয়</th>
                    <th>রেটিং</th>
                    <th>যাচাইকৃত</th>
                    <th>শিক্ষার্থী</th>
                    <th>কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td>{teacher.name}</td>
                      <td>{teacher.subjects.join(', ')}</td>
                      <td>⭐ {teacher.rating}</td>
                      <td>
                        {teacher.verified ? (
                          <span className="verified-badge-table">✓</span>
                        ) : (
                          <span className="pending-badge">⏳</span>
                        )}
                      </td>
                      <td>{teacher.students}+</td>
                      <td>
                        <button className="action-button">দেখুন</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
