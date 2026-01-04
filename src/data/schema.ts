// Database Schema Structure for Tuition Media Platform
// This represents the data models we'll use

export const userSchema = {
  id: 'string',
  name: 'string',
  email: 'string',
  password: 'string (hashed)',
  role: 'tutor | student',
  phone: 'string',
  location: 'string',
  profilePhoto: 'string (URL)',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
}

export const tutorProfileSchema = {
  id: 'string',
  userId: 'string (FK)',
  subjects: 'array of strings',
  classes: 'array of strings',
  education: 'array of objects',
  experience: 'number (years)',
  hourlyRate: 'number',
  bio: 'string',
  verificationStatus: 'pending | verified | rejected',
  verificationDocuments: 'array of URLs',
  rating: 'number',
  totalReviews: 'number',
  totalStudents: 'number',
  availability: 'array of availability objects',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
}

export const availabilitySchema = {
  id: 'string',
  tutorId: 'string (FK)',
  dayOfWeek: 'number (0-6)',
  startTime: 'string (HH:MM)',
  endTime: 'string (HH:MM)',
  isAvailable: 'boolean'
}

export const bookingSchema = {
  id: 'string',
  studentId: 'string (FK)',
  tutorId: 'string (FK)',
  subject: 'string',
  classLevel: 'string',
  date: 'date',
  time: 'string',
  duration: 'number (hours)',
  status: 'pending | accepted | rejected | completed | cancelled',
  price: 'number',
  paymentStatus: 'pending | paid | refunded',
  createdAt: 'timestamp',
  updatedAt: 'timestamp'
}

export const reviewSchema = {
  id: 'string',
  tutorId: 'string (FK)',
  studentId: 'string (FK)',
  bookingId: 'string (FK)',
  rating: 'number (1-5)',
  comment: 'string',
  createdAt: 'timestamp'
}

export const messageSchema = {
  id: 'string',
  senderId: 'string (FK)',
  receiverId: 'string (FK)',
  bookingId: 'string (FK, optional)',
  message: 'string',
  read: 'boolean',
  createdAt: 'timestamp'
}

// Sample data structure matching the schema
export const sampleUsers = [
  {
    id: 'user_1',
    name: 'ড. রহমান আহমেদ',
    email: 'rahman@example.com',
    role: 'tutor',
    phone: '+8801712345678',
    location: 'ঢাকা',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'user_2',
    name: 'আহমেদ করিম',
    email: 'karim@example.com',
    role: 'student',
    phone: '+8801712345679',
    location: 'ঢাকা',
    profilePhoto: null,
    createdAt: '2024-02-01T10:00:00Z'
  }
]

export const sampleBookings = [
  {
    id: 'booking_1',
    studentId: 'user_2',
    tutorId: 'user_1',
    subject: 'গণিত',
    classLevel: 'Class 10',
    date: '2024-03-15',
    time: '14:00',
    duration: 2,
    status: 'pending',
    price: 3000,
    paymentStatus: 'pending',
    createdAt: '2024-03-10T10:00:00Z'
  }
]
