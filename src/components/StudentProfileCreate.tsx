import React, { useState } from 'react'
import { classLevels, subjects } from '../data/subjects'
import './StudentProfileCreate.css'

function StudentProfileCreate({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    // Account Info
    email: '',
    password: '',
    confirmPassword: '',
    // Personal Info
    name: '',
    phone: '',
    location: '',
    district: '',
    area: '',
    profilePhoto: null,
    dateOfBirth: '',
    gender: '',

    // Academic Info
    currentClass: '',
    medium: '',
    schoolName: '',
    subjects: [],

    // Learning Preferences
    preferredSubjects: [],
    learningStyle: '',
    preferredTime: '',
    budget: '',

    // Additional Info
    guardianName: '',
    guardianPhone: '',
    address: '',
    bio: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.includes(subject)
        ? prev.preferredSubjects.filter(s => s !== subject)
        : [...prev.preferredSubjects, subject]
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }))
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.email.trim()) newErrors.email = 'ইমেইল প্রয়োজন'
      if (!formData.password.trim()) newErrors.password = 'পাসওয়ার্ড প্রয়োজন'
      if (formData.password.length < 6) newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'পাসওয়ার্ড মিলছে না'
      if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন'
      if (!formData.phone.trim()) newErrors.phone = 'ফোন নম্বর প্রয়োজন'
      if (!formData.location.trim()) newErrors.location = 'অবস্থান প্রয়োজন'
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'জন্ম তারিখ প্রয়োজন'
      if (!formData.gender) newErrors.gender = 'লিঙ্গ নির্বাচন করুন'
    }

    if (step === 2) {
      if (!formData.currentClass) newErrors.currentClass = 'বর্তমান ক্লাস নির্বাচন করুন'
      if (!formData.medium) newErrors.medium = 'মিডিয়াম নির্বাচন করুন'
      if (!formData.schoolName.trim()) newErrors.schoolName = 'স্কুলের নাম প্রয়োজন'
    }

    if (step === 3) {
      if (formData.preferredSubjects.length === 0) {
        newErrors.preferredSubjects = 'কমপক্ষে একটি বিষয় নির্বাচন করুন'
      }
      if (!formData.budget) newErrors.budget = 'বাজেট নির্ধারণ করুন'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      const studentData = {
        ...formData,
        role: 'student',
        createdAt: new Date().toISOString()
      }

      if (onSubmit) {
        onSubmit(studentData)
      }
    }
  }

  const getAvailableSubjects = () => {
    if (!formData.currentClass) return []
    const level = classLevels.find(c => c.value === formData.currentClass)?.level
    if (level && subjects[level]) {
      return Object.keys(subjects[level])
    }
    return []
  }

  return (
    <div className="student-profile-create">
      <div className="create-header">
        <h1>শিক্ষার্থী প্রোফাইল তৈরি করুন</h1>
        <p>আপনার প্রোফাইল সম্পূর্ণ করুন এবং উপযুক্ত শিক্ষক খুঁজে নিন</p>
      </div>

      <div className="step-indicator">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
            <div className="step-number">{step}</div>
            <div className="step-label">
              {step === 1 && 'ব্যক্তিগত তথ্য'}
              {step === 2 && 'শিক্ষাগত তথ্য'}
              {step === 3 && 'শিক্ষার পছন্দ'}
              {step === 4 && 'অতিরিক্ত তথ্য'}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2>ব্যক্তিগত তথ্য</h2>

            <div className="form-group">
              <label>নাম *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার পূর্ণ নাম"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>ইমেইল *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>ফোন নম্বর *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+8801712345678"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>পাসওয়ার্ড *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label>পাসওয়ার্ড নিশ্চিত করুন *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>জন্ম তারিখ *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>

              <div className="form-group">
                <label>লিঙ্গ *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="male">পুরুষ</option>
                  <option value="female">মহিলা</option>
                  <option value="other">অন্যান্য</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>জেলা *</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="ঢাকা, চট্টগ্রাম, ইত্যাদি"
              />
            </div>

            <div className="form-group">
              <label>এলাকা</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="মিরপুর, ধানমন্ডি, ইত্যাদি"
              />
            </div>

            <div className="form-group">
              <label>ঠিকানা</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="বিস্তারিত ঠিকানা"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>প্রোফাইল ছবি</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              {formData.profilePhoto && (
                <p className="file-name">✓ {formData.profilePhoto.name}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Academic Information */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2>শিক্ষাগত তথ্য</h2>

            <div className="form-row">
              <div className="form-group">
                <label>বর্তমান ক্লাস *</label>
                <select
                  name="currentClass"
                  value={formData.currentClass}
                  onChange={handleChange}
                  className={errors.currentClass ? 'error' : ''}
                >
                  <option value="">নির্বাচন করুন</option>
                  {classLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                {errors.currentClass && <span className="error-message">{errors.currentClass}</span>}
              </div>

              <div className="form-group">
                <label>মিডিয়াম *</label>
                <select
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  className={errors.medium ? 'error' : ''}
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="বাংলা মিডিয়াম">বাংলা মিডিয়াম</option>
                  <option value="ইংরেজি ভার্সন">ইংরেজি ভার্সন</option>
                  <option value="ইংরেজি মিডিয়াম (O/A Level)">ইংরেজি মিডিয়াম (O/A Level)</option>
                </select>
                {errors.medium && <span className="error-message">{errors.medium}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>স্কুল/কলেজের নাম *</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="স্কুল/কলেজের নাম"
                className={errors.schoolName ? 'error' : ''}
              />
              {errors.schoolName && <span className="error-message">{errors.schoolName}</span>}
            </div>

            <div className="form-group">
              <label>আপনার সম্পর্কে</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="আপনার শিক্ষাগত লক্ষ্য, শেখার পদ্ধতি ইত্যাদি সম্পর্কে লিখুন..."
                rows={5}
              />
            </div>
          </div>
        )}

        {/* Step 3: Learning Preferences */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2>শিক্ষার পছন্দ</h2>

            {formData.currentClass && (
              <div className="form-group">
                <label>কোন বিষয়গুলোতে সহায়তা চান? *</label>
                <div className="chip-container">
                  {getAvailableSubjects().map(subject => (
                    <button
                      key={subject}
                      type="button"
                      className={`chip ${formData.preferredSubjects.includes(subject) ? 'active' : ''}`}
                      onClick={() => handleSubjectToggle(subject)}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
                {errors.preferredSubjects && <span className="error-message">{errors.preferredSubjects}</span>}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>শেখার পদ্ধতি</label>
                <select
                  name="learningStyle"
                  value={formData.learningStyle}
                  onChange={handleChange}
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="visual">ভিজ্যুয়াল (ছবি/চার্ট)</option>
                  <option value="auditory">শ্রবণ (শুনে শেখা)</option>
                  <option value="kinesthetic">কাইনেসথেটিক (হাতে-কলমে)</option>
                  <option value="reading">পড়ে শেখা</option>
                </select>
              </div>

              <div className="form-group">
                <label>পছন্দের সময়</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="morning">সকাল (৬-১২টা)</option>
                  <option value="afternoon">দুপুর (১২-৫টা)</option>
                  <option value="evening">সন্ধ্যা (৫-৯টা)</option>
                  <option value="night">রাত (৯টা পর)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>মাসিক বাজেট (টাকা) *</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="5000"
                min="0"
                className={errors.budget ? 'error' : ''}
              />
              {errors.budget && <span className="error-message">{errors.budget}</span>}
            </div>
          </div>
        )}

        {/* Step 4: Additional Information */}
        {currentStep === 4 && (
          <div className="form-step">
            <h2>অতিরিক্ত তথ্য</h2>

            <div className="form-row">
              <div className="form-group">
                <label>অভিভাবকের নাম</label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  placeholder="অভিভাবকের নাম"
                />
              </div>

              <div className="form-group">
                <label>অভিভাবকের ফোন</label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  placeholder="+8801712345678"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  onChange={handleChange}
                />
                আমি শর্তাবলী এবং গোপনীয়তা নীতি পড়েছি এবং সম্মত
              </label>
            </div>
          </div>
        )}

        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" className="prev-button" onClick={handlePrevious}>
              ← পূর্ববর্তী
            </button>
          )}
          <div className="action-spacer" />
          {currentStep < totalSteps ? (
            <button type="button" className="next-button" onClick={handleNext}>
              পরবর্তী →
            </button>
          ) : (
            <button type="submit" className="submit-button">
              ✓ প্রোফাইল তৈরি করুন
            </button>
          )}
        </div>

        {onCancel && (
          <button type="button" className="cancel-link" onClick={onCancel}>
            বাতিল করুন
          </button>
        )}
      </form>
    </div>
  )
}

export default StudentProfileCreate
