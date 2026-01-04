import React from 'react'
import './Header.css'

interface HeaderProps {
  onBack?: (() => void) | null;
  currentView: string;
  onViewChange?: (view: string) => void;
  onAuthClick: () => void;
  user: any;
  onAdminClick: () => void;
  theme: string;
  onThemeToggle: () => void;
}

function Header({ onBack, currentView, onViewChange, onAuthClick, user, onAdminClick, theme, onThemeToggle }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ← ফিরে যান
          </button>
        )}
        <h1 className="logo" onClick={() => onViewChange && onViewChange('home')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">📚</span>
          ShebaBD
        </h1>
        <nav className="nav">
          <a
            href="#find-tutors"
            className={`nav-link ${currentView === 'find-tutors' || currentView === 'teachers' || currentView === 'home' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              if (onViewChange) {
                onViewChange('find-tutors')
              }
            }}
          >
            Find Tutors
          </a>
          <a
            href="#become-tutor"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              if (onViewChange) {
                onViewChange('create-teacher-profile')
              }
            }}
          >
            Become a Tutor
          </a>
          <a
            href="#quiz"
            className={`nav-link ${currentView === 'quiz' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              if (onViewChange) {
                onViewChange('quiz')
              }
            }}
          >
            Quiz Portal
          </a>
          <a
            href="#about"
            className="nav-link"
          >
            About Us
          </a>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" onClick={onThemeToggle} title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <>
              <span className="user-name">{user.name}</span>
              {user.role === 'tutor' && (
                <button className="create-profile-button" onClick={() => onViewChange && onViewChange('create-teacher-profile')}>
                  শিক্ষক প্রোফাইল
                </button>
              )}
              {user.role === 'student' && !user.profileComplete && (
                <button className="create-profile-button" onClick={() => onViewChange && onViewChange('create-student-profile')}>
                  প্রোফাইল তৈরি
                </button>
              )}
              {user.role === 'admin' && (
                <button className="admin-button" onClick={onAdminClick}>
                  অ্যাডমিন
                </button>
              )}
            </>
          ) : (
            <button className="auth-button" onClick={onAuthClick}>
              Login/Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
