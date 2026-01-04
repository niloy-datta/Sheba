import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import StudentDashboard from './components/StudentDashboard'
import MediaGallery from './components/MediaGallery'
import VideoPlayer from './components/VideoPlayer'
import TeachersList from './components/TeachersList'
import TeacherProfile from './components/TeacherProfile'
import TeacherProfileCreate from './components/TeacherProfileCreate'
import StudentProfileCreate from './components/StudentProfileCreate'
import AuthModal from './components/AuthModal'
import AdminPanel from './components/AdminPanel'
import QuizPortal from './components/QuizPortal'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import Legal from './components/Legal'
import './App.css'

// Teacher data
const teachers = [
  {
    id: 1,
    name: 'ড. রহমান আহমেদ',
    title: 'গণিত বিশেষজ্ঞ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    rating: 4.9,
    reviews: 1250,
    experience: 15,
    students: 5000,
    videos: 120,
    subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    bio: '১৫ বছরের অভিজ্ঞতা নিয়ে গণিত ও পদার্থবিজ্ঞানের একজন প্রখ্যাত শিক্ষক। SSC এবং HSC পরীক্ষার প্রস্তুতিতে সহায়তা করার জন্য পরিচিত।',
    qualifications: [
      'M.Sc in Mathematics, DU',
      'B.Ed from IER, DU',
      '15+ years teaching experience',
      '5000+ successful students'
    ],
    verified: true,
    location: 'ঢাকা',
    district: 'ঢাকা',
    area: 'মিরপুর',
    medium: ['বাংলা মিডিয়াম'],
    pricePerHour: 1500,
    available: true,
    email: 'rahman@example.com',
    phone: '+8801712345678',
    gender: 'male'
  },
  {
    id: 2,
    name: 'প্রফেসর ফাতেমা খাতুন',
    title: 'রসায়নবিদ্যা শিক্ষক',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    rating: 4.8,
    reviews: 980,
    experience: 12,
    students: 3800,
    videos: 95,
    subjects: ['রসায়ন', 'জীববিজ্ঞান'],
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    bio: 'রসায়ন ও জীববিজ্ঞানের একজন দক্ষ শিক্ষক। সহজ ভাষায় জটিল বিষয়গুলো ব্যাখ্যা করার জন্য বিখ্যাত।',
    qualifications: [
      'M.Sc in Chemistry, BUET',
      'B.Ed from IER, DU',
      '12+ years teaching experience',
      '3800+ successful students'
    ],
    verified: true,
    location: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম',
    area: 'আগ্রাবাদ',
    medium: ['বাংলা মিডিয়াম'],
    pricePerHour: 1200,
    available: true,
    email: 'fatema@example.com',
    phone: '+8801712345679',
    gender: 'female'
  },
  {
    id: 3,
    name: 'মোঃ করিম উদ্দিন',
    title: 'ইংরেজি ভাষা শিক্ষক',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    rating: 4.7,
    reviews: 850,
    experience: 10,
    students: 3200,
    videos: 80,
    subjects: ['ইংরেজি', 'বাংলা'],
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'],
    bio: 'ইংরেজি ও বাংলা ভাষার একজন অভিজ্ঞ শিক্ষক। ছোট বাচ্চাদের জন্য বিশেষভাবে কার্যকরী শিক্ষা পদ্ধতি ব্যবহার করেন।',
    qualifications: [
      'M.A in English, DU',
      'B.Ed from IER, DU',
      '10+ years teaching experience',
      '3200+ successful students'
    ],
    verified: true,
    location: 'ঢাকা',
    district: 'ঢাকা',
    area: 'ধানমন্ডি',
    medium: ['বাংলা মিডিয়াম', 'ইংরেজি ভার্সন'],
    pricePerHour: 800,
    available: true,
    email: 'karim@example.com',
    phone: '+8801712345680',
    gender: 'male'
  },
  {
    id: 4,
    name: 'ড. সায়মা ইসলাম',
    title: 'পদার্থবিজ্ঞান বিশেষজ্ঞ',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    rating: 4.9,
    reviews: 1100,
    experience: 14,
    students: 4500,
    videos: 110,
    subjects: ['পদার্থবিজ্ঞান', 'গণিত'],
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    bio: 'পদার্থবিজ্ঞানের একজন প্রখ্যাত শিক্ষক। HSC পরীক্ষার জন্য বিশেষভাবে পরিচিত এবং অসংখ্য শিক্ষার্থীকে সফল করেছেন।',
    qualifications: [
      'Ph.D in Physics, BUET',
      'M.Sc in Physics, DU',
      '14+ years teaching experience',
      '4500+ successful students'
    ],
    verified: true,
    location: 'সিলেট',
    district: 'সিলেট',
    area: 'জকিগঞ্জ',
    medium: ['বাংলা মিডিয়াম'],
    pricePerHour: 1800,
    available: true,
    email: 'sayma@example.com',
    phone: '+8801712345681',
    gender: 'female'
  },
  {
    id: 5,
    name: 'আনিসা বেগম',
    title: 'প্রাথমিক শিক্ষক',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    rating: 4.8,
    reviews: 720,
    experience: 8,
    students: 2800,
    videos: 65,
    subjects: ['বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান'],
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    bio: 'প্রাথমিক শিক্ষার একজন দক্ষ শিক্ষক। ছোট বাচ্চাদের জন্য আনন্দদায়ক এবং কার্যকরী শিক্ষা পদ্ধতি ব্যবহার করেন।',
    qualifications: [
      'B.Ed in Primary Education',
      '8+ years teaching experience',
      '2800+ successful students',
      'Specialized in child psychology'
    ],
    verified: true,
    location: 'ঢাকা',
    district: 'ঢাকা',
    area: 'উত্তরা',
    medium: ['বাংলা মিডিয়াম'],
    pricePerHour: 600,
    available: true,
    email: 'anisa@example.com',
    phone: '+8801712345682',
    gender: 'female'
  },
  {
    id: 6,
    name: 'মোঃ হাসান আলী',
    title: 'জীববিজ্ঞান শিক্ষক',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    rating: 4.7,
    reviews: 650,
    experience: 11,
    students: 2900,
    videos: 75,
    subjects: ['জীববিজ্ঞান', 'বিজ্ঞান'],
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    bio: 'জীববিজ্ঞানের একজন অভিজ্ঞ শিক্ষক। SSC পরীক্ষার প্রস্তুতিতে বিশেষভাবে সহায়তা করেন।',
    qualifications: [
      'M.Sc in Biology, DU',
      'B.Ed from IER, DU',
      '11+ years teaching experience',
      '2900+ successful students'
    ],
    verified: false,
    location: 'রাজশাহী',
    district: 'রাজশাহী',
    area: 'বোয়ালিয়া',
    medium: ['বাংলা মিডিয়াম'],
    pricePerHour: 1000,
    available: true,
    email: 'hasan@example.com',
    phone: '+8801712345683',
    gender: 'male'
  },
  {
    id: 7,
    name: 'সারা আহমেদ',
    title: 'O-Level Mathematics Teacher',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    rating: 4.8,
    reviews: 650,
    experience: 8,
    students: 2200,
    videos: 60,
    subjects: ['Mathematics', 'Physics'],
    classes: ['O-Level', 'A-Level'],
    bio: 'O-Level এবং A-Level Mathematics এবং Physics এর একজন অভিজ্ঞ শিক্ষক। Cambridge curriculum এ বিশেষজ্ঞ।',
    qualifications: [
      'B.Sc in Mathematics, BUET',
      '8+ years O-Level teaching experience',
      '2200+ successful students'
    ],
    verified: true,
    location: 'ঢাকা',
    district: 'ঢাকা',
    area: 'গুলশান',
    medium: ['ইংরেজি মিডিয়াম (O/A Level)'],
    pricePerHour: 2000,
    available: true,
    email: 'sara@example.com',
    phone: '+8801712345684',
    gender: 'female'
  },
  {
    id: 8,
    name: 'আহমেদ হাসান',
    title: 'ইংরেজি ভার্সন বিশেষজ্ঞ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    rating: 4.7,
    reviews: 580,
    experience: 10,
    students: 2600,
    videos: 70,
    subjects: ['English', 'Mathematics'],
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    bio: 'ইংরেজি ভার্সনের একজন দক্ষ শিক্ষক। SSC এবং HSC পরীক্ষার প্রস্তুতিতে বিশেষজ্ঞ।',
    qualifications: [
      'M.A in English, DU',
      '10+ years teaching experience',
      '2600+ successful students'
    ],
    verified: true,
    location: 'ঢাকা',
    district: 'ঢাকা',
    area: 'বনানী',
    medium: ['ইংরেজি ভার্সন'],
    pricePerHour: 1400,
    available: true,
    email: 'ahmed@example.com',
    phone: '+8801712345685',
    gender: 'male'
  }
]

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [view, setView] = useState('home') // 'home', 'gallery', 'video', 'teachers', 'admin'
  const [user, setUser] = useState(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [bookings, setBookings] = useState(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('bookings')
    return savedBookings ? JSON.parse(savedBookings) : []
  })
  const [, setPendingRole] = useState<string | null>(null) // Track selected role before showing form
  const [teachersState, setTeachersState] = useState(() => {
    // Load teachers from localStorage or use default
    const savedTeachers = localStorage.getItem('teachers')
    if (savedTeachers) {
      try {
        const parsed = JSON.parse(savedTeachers)
        // Merge with default teachers, avoiding duplicates
        const defaultIds = new Set(teachers.map(t => t.id))
        const saved = parsed.filter((t: any) => !defaultIds.has(t.id))
        return [...teachers, ...saved]
      } catch (e) {
        console.error('Error loading teachers from localStorage:', e)
        return teachers
      }
    }
    return teachers
  })
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  // Save teachers to localStorage whenever it changes
  useEffect(() => {
    // Only save teachers that are not in the default list
    const defaultIds = new Set(teachers.map(t => t.id))
    const customTeachers = teachersState.filter(t => !defaultIds.has(t.id))
    if (customTeachers.length > 0) {
      localStorage.setItem('teachers', JSON.stringify(customTeachers))
    }
  }, [teachersState])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  // Save bookings to localStorage whenever it changes
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('bookings', JSON.stringify(bookings))
    }
  }, [bookings])

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Apply theme on initial mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video)
    setView('video')
  }

  const handleBackToGallery = () => {
    setView('gallery')
    setSelectedVideo(null)
    setSelectedTeacher(null)
  }

  const handleViewChange = (newView: string) => {
    setView(newView)
    setSelectedVideo(null)
    setSelectedTeacher(null)
  }

  const handleHomeSearch = (searchFilters: any) => {
    // Switch to student dashboard for finding teachers
    setView('find-tutors')
  }

  const handleStudentBookingSubmit = (bookingData: any) => {
    const newBooking = {
      id: `booking_${Date.now()}`,
      ...bookingData,
      studentId: user?.id,
      studentName: user?.name || 'Guest',
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    const updatedBookings = [...bookings, newBooking]
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    console.log('New booking:', newBooking)
  }

  const handleTeacherSelect = (teacher: any) => {
    setSelectedTeacher(teacher)
    setView('teacher')
  }

  const handleLogin = (credentials: any) => {
    // Simulate login - in real app, this would call an API
    console.log('Login:', credentials)

    // Try to find user from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      if (user.email === credentials.email) {
        setUser(user)
        setShowAuthModal(false)
        return
      }
    }

    // Default login for testing
    const defaultUser = {
      id: 'user_1',
      name: 'Test User',
      email: credentials.email,
      role: 'student'
    }
    setUser(defaultUser)
    localStorage.setItem('user', JSON.stringify(defaultUser))
    setShowAuthModal(false)
  }

  const handleRoleSelect = (role: string) => {
    // When user selects a role, show the appropriate profile creation form
    setPendingRole(role)
    setShowAuthModal(false)
    if (role === 'student') {
      setView('create-student-profile')
    } else if (role === 'tutor') {
      setView('create-teacher-profile')
    }
  }

  const handleRegister = (userData: any) => {
    // Simulate registration - in real app, this would call an API
    console.log('Register:', userData)
    setUser({
      id: 'user_new',
      name: userData.name,
      email: userData.email,
      role: userData.role,
      location: userData.location,
      phone: userData.phone,
      profileComplete: true  // Set to true since basic registration info is complete
    })
    setShowAuthModal(false)

    // Go to home page after registration
    setView('home')
  }

  const handleBookingSubmit = (bookingData: any) => {
    // Add booking to state
    const newBooking = {
      id: `booking_${Date.now()}`,
      ...bookingData,
      studentName: user?.name || 'Guest',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    const updatedBookings = [...bookings, newBooking]
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    console.log('New booking:', newBooking)
  }

  const handleVerifyTeacher = (teacherId: any, status: string) => {
    setTeachersState(prev => {
      const updated = prev.map(teacher =>
        teacher.id === teacherId
          ? { ...teacher, verified: status === 'verified' }
          : teacher
      )
      // Save to localStorage
      const defaultIds = new Set(teachers.map(t => t.id))
      const customTeachers = updated.filter(t => !defaultIds.has(t.id))
      localStorage.setItem('teachers', JSON.stringify(customTeachers))
      return updated
    })
  }

  const handleApproveBooking = (bookingId: string) => {
    setBookings((prev: any[]) => {
      const updated = prev.map((booking: any) =>
        booking.id === bookingId
          ? { ...booking, status: 'accepted' }
          : booking
      )
      localStorage.setItem('bookings', JSON.stringify(updated))
      return updated
    })
  }

  const handleTeacherProfileSubmit = (teacherData: any) => {
    const teacherId = `teacher_${Date.now()}`

    // Create user account
    setUser({
      id: teacherId,
      name: teacherData.name,
      email: teacherData.email,
      phone: teacherData.phone,
      role: 'tutor',
      location: teacherData.location,
      profileComplete: true
    })

    // Generate new teacher ID
    const newTeacher = {
      id: teacherId,
      ...teacherData,
      subjects: teacherData.selectedSubjects,
      classes: teacherData.selectedClasses.map((c: string) => `Class ${c}`),
      pricePerHour: parseInt(teacherData.hourlyRate),
      experience: parseInt(teacherData.experience),
      rating: 0,
      reviews: 0,
      students: 0,
      videos: 0,
      verified: false,  // Teachers need verification
      avatar: teacherData.profilePhoto ? URL.createObjectURL(teacherData.profilePhoto) : null
    }

    // Add to teachers list
    setTeachersState(prev => {
      const updated = [...prev, newTeacher]
      // Save to localStorage immediately
      const defaultIds = new Set(teachers.map(t => t.id))
      const customTeachers = updated.filter(t => !defaultIds.has(t.id))
      localStorage.setItem('teachers', JSON.stringify(customTeachers))
      return updated
    })

    // Show success message
    alert('আপনার প্রোফাইল জমা দেওয়া হয়েছে! অ্যাডমিন যাচাই করার পর এটি প্রকাশিত হবে।')

    // Go back to teachers list
    setView('teachers')
  }

  const handleStudentProfileSubmit = (studentData: any) => {
    // Create user account with student profile data
    const studentId = `student_${Date.now()}`
    const newUser = {
      id: studentId,
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone,
      role: 'student',
      location: studentData.location || studentData.district,
      profileComplete: true
    }
    setUser(newUser)

    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(newUser))

    // Show success message
    alert('আপনার শিক্ষার্থী প্রোফাইল সফলভাবে তৈরি হয়েছে! এখন আপনি শিক্ষক খুঁজে পেতে পারেন।')

    // Redirect to find tutors
    setView('find-tutors')
  }

  return (
    <div className="app">
      <Header
        onBack={view === 'video' || view === 'teacher' ? handleBackToGallery : null}
        currentView={view}
        onViewChange={handleViewChange}
        onAuthClick={() => setShowAuthModal(true)}
        user={user}
        onAdminClick={() => setView('admin')}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main className={`main-content ${view === 'home' ? 'homepage-content' : ''}`}>
        {view === 'home' ? (
          <HomePage
            teachers={teachersState.filter(t => t.verified)}
            onSearch={handleHomeSearch}
            onTeacherSelect={handleTeacherSelect}
            onViewChange={handleViewChange}
          />
        ) : view === 'gallery' ? (
          <MediaGallery onVideoSelect={handleVideoSelect} teachers={teachersState.filter(t => t.verified)} />
        ) : view === 'video' ? (
          <VideoPlayer video={selectedVideo} onBack={handleBackToGallery} teachers={teachersState.filter(t => t.verified)} />
        ) : view === 'find-tutors' || (view === 'teachers' && user?.role === 'student') ? (
          <StudentDashboard
            teachers={teachersState.filter(t => t.verified)}
            user={user}
            onBookingSubmit={handleStudentBookingSubmit}
          />
        ) : view === 'teachers' ? (
          <TeachersList
            teachers={teachersState.filter(t => t.verified)}
            onTeacherSelect={handleTeacherSelect}
            onCreateProfile={() => setView('create-teacher-profile')}
          />
        ) : view === 'teacher' ? (
          <>
            <button className="back-button" onClick={handleBackToGallery} style={{ marginBottom: '1rem' }}>
              ← ফিরে যান
            </button>
            <TeacherProfile
              teacher={selectedTeacher}
              onBookingSubmit={handleBookingSubmit}
            />
          </>
        ) : view === 'admin' ? (
          <AdminPanel
            teachers={teachersState}
            bookings={bookings}
            onVerifyTeacher={handleVerifyTeacher}
            onApproveBooking={handleApproveBooking}
          />
        ) : view === 'create-teacher-profile' ? (
          <TeacherProfileCreate
            onSubmit={handleTeacherProfileSubmit}
            onCancel={() => setView('gallery')}
          />
        ) : view === 'create-student-profile' ? (
          <StudentProfileCreate
            onSubmit={handleStudentProfileSubmit}
            onCancel={() => setView('home')}
          />
        ) : view === 'quiz' ? (
          <QuizPortal />
        ) : view === 'about' ? (
          <AboutUs />
        ) : view === 'contact' ? (
          <Contact />
        ) : view === 'terms' ? (
          <Legal type="terms" />
        ) : view === 'privacy' ? (
          <Legal type="privacy" />
        ) : null}
      </main>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onRoleSelect={handleRoleSelect}
        />
      )}
    </div>
  )
}

export default App
