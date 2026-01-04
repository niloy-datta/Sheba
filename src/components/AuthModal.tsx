import React, { useState } from 'react'
import './AuthModal.css'

function AuthModal({ onClose, onLogin, onRegister, onRoleSelect }) {
  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null) // 'student' or 'tutor'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    location: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    if (onRoleSelect) {
      onRoleSelect(role)
      onClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      if (onLogin) {
        onLogin({
          email: formData.email,
          password: formData.password
        })
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('পাসওয়ার্ড মিলছে না!')
        return
      }
      if (onRegister) {
        onRegister(formData)
      }
    }
    onClose()
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <h2>{isLogin ? 'লগইন করুন' : 'নিবন্ধন করুন'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true)
              setSelectedRole(null) // Reset role selection when switching to login
            }}
          >
            লগইন
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false)
              setSelectedRole(null) // Reset role selection when switching to register
            }}
          >
            নিবন্ধন
          </button>
        </div>

        {!isLogin && !selectedRole ? (
          // Role Selection Screen
          <div className="role-selection">
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>আপনি কে?</h3>
            <div className="role-options">
              <button
                type="button"
                className="role-option-button"
                onClick={() => handleRoleSelect('student')}
              >
                <div className="role-icon">🎓</div>
                <h3>শিক্ষার্থী</h3>
                <p>আমি একজন শিক্ষার্থী, শিক্ষক খুঁজছি</p>
              </button>
              <button
                type="button"
                className="role-option-button"
                onClick={() => handleRoleSelect('tutor')}
              >
                <div className="role-icon">👨‍🏫</div>
                <h3>শিক্ষক</h3>
                <p>আমি একজন শিক্ষক, শিক্ষার্থী খুঁজছি</p>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>নাম *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="আপনার নাম"
                  />
                </div>

                <div className="form-group">
                  <label>ফোন নম্বর *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+8801712345678"
                  />
                </div>

                <div className="form-group">
                  <label>অবস্থান</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    <option value="ঢাকা">ঢাকা</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                    <option value="রাজশাহী">রাজশাহী</option>
                    <option value="খুলনা">খুলনা</option>
                    <option value="বরিশাল">বরিশাল</option>
                    <option value="সিলেট">সিলেট</option>
                    <option value="রংপুর">রংপুর</option>
                    <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                  </select>
                </div>
              </>
            )}

          <div className="form-group">
            <label>ইমেইল *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>পাসওয়ার্ড *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              minLength="6"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>পাসওয়ার্ড নিশ্চিত করুন *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength="6"
              />
            </div>
          )}

            <button type="submit" className="auth-submit-button">
              {isLogin ? 'লগইন করুন' : 'নিবন্ধন করুন'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthModal
