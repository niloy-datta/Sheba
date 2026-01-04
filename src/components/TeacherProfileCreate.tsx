import React, { useState } from 'react'
import { classLevels, subjects } from '../data/subjects.js'
import './TeacherProfileCreate.css'

interface TeacherProfileProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

interface Errors {
  [key: string]: string;
}

function TeacherProfileCreate({ onSubmit, onCancel }: TeacherProfileProps) {
  const [formData, setFormData] = useState({
    // Account Info
    email: '',
    password: '',
    confirmPassword: '',
    // Personal Info
    name: '',
    phone: '',
    location: '',
    profilePhoto: null as File | null,

    // Professional Info
    title: '',
    bio: '',
    experience: '',
    hourlyRate: '',

    // Subjects & Classes
    selectedSubjects: [] as string[],
    selectedClasses: [] as string[],

    // Education
    qualifications: [''],

    // Availability
    available: true,

    // Documents for verification
    documents: [] as File[]
  })

  const [errors, setErrors] = useState<Errors>({})
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

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

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => {
      const newSubjects = prev.selectedSubjects.includes(subject)
        ? prev.selectedSubjects.filter(s => s !== subject)
        : [...prev.selectedSubjects, subject]

      // Clear subject error when a subject is selected
      if (newSubjects.length > 0 && errors.subjects) {
        setErrors(prev => ({
          ...prev,
          subjects: ''
        }))
      }

      return {
        ...prev,
        selectedSubjects: newSubjects
      }
    })
  }

  const handleClassToggle = (classLevel: string) => {
    setFormData(prev => ({
      ...prev,
      selectedClasses: prev.selectedClasses.includes(classLevel)
        ? prev.selectedClasses.filter(c => c !== classLevel)
        : [...prev.selectedClasses, classLevel]
    }))
  }

  const handleQualificationChange = (index: number, value: string) => {
    const newQualifications = [...formData.qualifications]
    newQualifications[index] = value
    setFormData(prev => ({
      ...prev,
      qualifications: newQualifications
    }))
  }

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, '']
    }))
  }

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }))
  }

  const handleFileChange = (e: any, field: string) => {
    const file = e.target.files?.[0]
    if (file) {
      if (field === 'profilePhoto') {
        setFormData(prev => ({
          ...prev,
          profilePhoto: file
        }))
      } else if (field === 'documents') {
        setFormData(prev => ({
          ...prev,
          documents: [...prev.documents, file]
        }))
      }
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Errors = {}

    if (step === 1) {
      if (!formData.email.trim()) newErrors.email = 'ইমেইল প্রয়োজন'
      if (!formData.password.trim()) newErrors.password = 'পাসওয়ার্ড প্রয়োজন'
      if (formData.password.length < 6) newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'পাসওয়ার্ড মিলছে না'
      if (!formData.name.trim()) newErrors.name = 'নাম প্রয়োজন'
      if (!formData.phone.trim()) newErrors.phone = 'ফোন নম্বর প্রয়োজন'
      if (!formData.location.trim()) newErrors.location = 'অবস্থান প্রয়োজন'
      if (!formData.title.trim()) newErrors.title = 'পদবী প্রয়োজন'
    }

    if (step === 2) {
      if (formData.selectedSubjects.length === 0) newErrors.subjects = 'কমপক্ষে একটি বিষয় নির্বাচন করুন'
      if (formData.selectedClasses.length === 0) newErrors.classes = 'কমপক্ষে একটি ক্লাস নির্বাচন করুন'
      if (!formData.hourlyRate) newErrors.hourlyRate = 'প্রতি ঘণ্টার মূল্য প্রয়োজন'
    }

    if (step === 3) {
      if (!formData.bio.trim()) newErrors.bio = 'বায়ো প্রয়োজন'
      if (formData.qualifications.filter(q => q.trim()).length === 0) {
        newErrors.qualifications = 'কমপক্ষে একটি যোগ্যতা যোগ করুন'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    const isValid = validateStep(currentStep)
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.error-message')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      const teacherData = {
        ...formData,
        qualifications: formData.qualifications.filter(q => q.trim()),
        verified: false, // New teachers need verification
        rating: 0,
        reviews: 0,
        students: 0,
        videos: 0
      }

      if (onSubmit) {
        onSubmit(teacherData)
      }
    }
  }

  const getAvailableSubjects = () => {
    const allSubjects = new Set<string>()

    // Get all subjects from all selected classes
    formData.selectedClasses.forEach(classLevel => {
      const classInfo = classLevels.find(c => c.value === classLevel)
      if (classInfo) {
        const level = classInfo.level // 'primary', 'secondary', 'higherSecondary'

        // Check all mediums for subjects
        Object.keys(subjects).forEach(medium => {
          const mediumSubjects = subjects[medium]
          if (mediumSubjects && mediumSubjects[level]) {
            // Get all subject names from this level
            Object.keys(mediumSubjects[level]).forEach(subject => {
              allSubjects.add(subject)
            })
          }
        })
      }
    })

    const subjectArray = Array.from(allSubjects).sort()

    // If no subjects found, return common subjects as fallback based on class level
    if (subjectArray.length === 0 && formData.selectedClasses.length > 0) {
      const hasPrimary = formData.selectedClasses.some(c => {
        const info = classLevels.find(cl => cl.value === c)
        return info?.level === 'primary'
      })
      const hasSecondary = formData.selectedClasses.some(c => {
        const info = classLevels.find(cl => cl.value === c)
        return info?.level === 'secondary'
      })
      const hasHigher = formData.selectedClasses.some(c => {
        const info = classLevels.find(cl => cl.value === c)
        return info?.level === 'higherSecondary'
      })

      if (hasPrimary) {
        return ['বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান', 'সামাজিক বিজ্ঞান']
      } else if (hasHigher) {
        return ['গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'ইংরেজি', 'বাংলা', 'উচ্চতর গণিত']
      } else {
        return ['গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'ইংরেজি', 'বাংলা', 'সাধারণ গণিত']
      }
    }

    return subjectArray
  }

  return (
    <div className="teacher-profile-create">
      <div className="create-header">
        <h1>শিক্ষক প্রোফাইল তৈরি করুন</h1>
        <p>আপনার প্রোফাইল সম্পূর্ণ করুন এবং শিক্ষার্থীদের সাথে সংযুক্ত হন</p>
      </div>

      <div className="step-indicator">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
            <div className="step-number">{step}</div>
            <div className="step-label">
              {step === 1 && 'ব্যক্তিগত তথ্য'}
              {step === 2 && 'বিষয় ও মূল্য'}
              {step === 3 && 'যোগ্যতা'}
              {step === 4 && 'নথি'}
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
                  minLength="6"
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
                  minLength="6"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>অবস্থান *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="ঢাকা, চট্টগ্রাম, ইত্যাদি"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label>পদবী/শিরোনাম *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="যেমন: গণিত বিশেষজ্ঞ, পদার্থবিজ্ঞান শিক্ষক"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>প্রোফাইল ছবি</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'profilePhoto')}
                className="file-input"
              />
              {formData.profilePhoto && (
                <p className="file-name">✓ {formData.profilePhoto.name}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Subjects & Pricing */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2>বিষয় ও মূল্য</h2>

            <div className="form-group">
              <label>কোন ক্লাস পড়াবেন? *</label>
              <div className="chip-container">
                {classLevels.map(level => (
                  <button
                    key={level.value}
                    type="button"
                    className={`chip ${formData.selectedClasses.includes(level.value) ? 'active' : ''}`}
                    onClick={() => handleClassToggle(level.value)}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
              {errors.classes && <span className="error-message">{errors.classes}</span>}
            </div>

            {formData.selectedClasses.length > 0 && (
              <div className="form-group">
                <label>কোন বিষয় পড়াবেন? *</label>
                {getAvailableSubjects().length > 0 ? (
                  <div className="chip-container">
                    {getAvailableSubjects().map(subject => (
                      <button
                        key={subject}
                        type="button"
                        className={`chip ${formData.selectedSubjects.includes(subject) ? 'active' : ''}`}
                        onClick={() => handleSubjectToggle(subject)}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    বিষয় লোড হচ্ছে...
                  </p>
                )}
                {errors.subjects && <span className="error-message">{errors.subjects}</span>}
                {formData.selectedSubjects.length > 0 && (
                  <p style={{ color: '#10b981', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    ✓ {formData.selectedSubjects.length}টি বিষয় নির্বাচিত হয়েছে
                  </p>
                )}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>অভিজ্ঞতা (বছর) *</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="5"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>প্রতি ঘণ্টার মূল্য (টাকা) *</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="1000"
                  min="0"
                  className={errors.hourlyRate ? 'error' : ''}
                />
                {errors.hourlyRate && <span className="error-message">{errors.hourlyRate}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Qualifications */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2>যোগ্যতা ও অভিজ্ঞতা</h2>

            <div className="form-group">
              <label>আপনার সম্পর্কে *</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="আপনার শিক্ষাগত যোগ্যতা, অভিজ্ঞতা এবং শিক্ষাদানের পদ্ধতি সম্পর্কে লিখুন..."
                rows="6"
                className={errors.bio ? 'error' : ''}
              />
              {errors.bio && <span className="error-message">{errors.bio}</span>}
            </div>

            <div className="form-group">
              <label>শিক্ষাগত যোগ্যতা *</label>
              {formData.qualifications.map((qual, index) => (
                <div key={index} className="qualification-input">
                  <input
                    type="text"
                    value={qual}
                    onChange={(e) => handleQualificationChange(index, e.target.value)}
                    placeholder="যেমন: M.Sc in Mathematics, DU"
                  />
                  {formData.qualifications.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeQualification(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-button"
                onClick={addQualification}
              >
                + যোগ্যতা যোগ করুন
              </button>
              {errors.qualifications && <span className="error-message">{errors.qualifications}</span>}
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {currentStep === 4 && (
          <div className="form-step">
            <h2>যাচাইকরণের জন্য নথি</h2>
            <p className="info-text">
              আপনার পরিচয়পত্র, শিক্ষাগত সনদ বা অন্যান্য প্রাসঙ্গিক নথি আপলোড করুন।
              এটি আপনার প্রোফাইল যাচাইকরণের জন্য প্রয়োজন।
            </p>

            <div className="form-group">
              <label>নথি আপলোড করুন (PDF, JPG, PNG)</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={(e) => {
                  Array.from(e.target.files).forEach(file => {
                    handleFileChange({ target: { files: [file] } }, 'documents')
                  })
                }}
                className="file-input"
              />
              {formData.documents.length > 0 && (
                <div className="documents-list">
                  {formData.documents.map((doc, index) => (
                    <div key={index} className="document-item">
                      <span>📄 {doc.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                />
                আমি এখন শিক্ষার্থী গ্রহণ করতে প্রস্তুত
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

export default TeacherProfileCreate
