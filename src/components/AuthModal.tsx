import React, { useState } from 'react'
import './AuthModal.css'

interface AuthModalProps {
  onClose: () => void;
  onLogin: (data: any) => void;
  onRegister: (data: any) => void;
  onRoleSelect: (role: string) => void;
}

function AuthModal({ onClose, onLogin, onRegister, onRoleSelect }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState<string | null>(null) // 'student' or 'tutor'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    location: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    if (onRoleSelect) {
      onRoleSelect(role)
      onClose()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleGithubLogin = () => {
    // Mock GitHub login for now
    const mockGithubUser = {
      name: 'GitHub User',
      email: 'github@example.com',
      role: 'student', // Default role
      id: 'github_user_123',
      profileComplete: true
    }

    // In a real app, this would redirect to GitHub OAuth
    console.log('Initiating GitHub Login...')

    // For now we simulate a successful login if the onLogin prop handles it appropriately
    // But typically OAuth is a redirect flow.
    // We'll just alert for this prototype.
    alert('GitHub Login would happen here. (Prototype Mode)')
    if (onLogin) {
      onLogin(mockGithubUser)
    }
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
                minLength={6}
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
                  minLength={6}
                />
              </div>
            )}

            <button type="submit" className="auth-submit-button">
              {isLogin ? 'লগইন করুন' : 'নিবন্ধন করুন'}
            </button>

            <div className="auth-divider">
              <span>অথবা</span>
            </div>

            <button type="button" className="github-login-button" onClick={handleGithubLogin}>
              <svg viewBox="0 0 24 24" width="20" height="20" className="github-icon">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Sign in with GitHub
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthModal
