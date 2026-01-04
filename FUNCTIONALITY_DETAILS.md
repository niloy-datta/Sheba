# ShebaBD - Complete Functionality Documentation

## 📚 Overview
ShebaBD হল একটি comprehensive tuition media platform যেখানে শিক্ষার্থীরা শিক্ষক খুঁজে পেতে পারে এবং শিক্ষকরা তাদের প্রোফাইল তৈরি করতে পারে।

---

## 🎯 Main Features

### 1. **Authentication System (লগইন/নিবন্ধন)**

#### Login (লগইন)
- Email এবং Password দিয়ে লগইন
- localStorage থেকে user data load হয়
- Login করলে user session persist হয়

#### Registration (নিবন্ধন)
- **Step 1**: Role Selection (শিক্ষার্থী বা শিক্ষক নির্বাচন)
  - দুইটি option button: 🎓 শিক্ষার্থী / 👨‍🏫 শিক্ষক
  - Role select করলে modal বন্ধ হয়ে যায়

- **Step 2**: Profile Creation Form
  - Role অনুযায়ী আলাদা form দেখায়:
    - **Student**: StudentProfileCreate component
    - **Teacher**: TeacherProfileCreate component

---

### 2. **Student Features (শিক্ষার্থী)**

#### Student Profile Creation
**4-Step Form Process:**

**Step 1: ব্যক্তিগত তথ্য**
- Email * (Account creation)
- Password * (Account creation)
- Confirm Password *
- Name *
- Phone *
- Date of Birth *
- Gender *
- District *
- Area
- Address
- Profile Photo

**Step 2: শিক্ষাগত তথ্য**
- Current Class *
- Medium * (বাংলা/ইংরেজি/O-Level)
- School/College Name *
- Bio

**Step 3: শিক্ষার পছন্দ**
- Preferred Subjects * (Multiple selection)
- Learning Style
- Preferred Time
- Monthly Budget *

**Step 4: অতিরিক্ত তথ্য**
- Guardian Name
- Guardian Phone
- Terms & Conditions acceptance

**Submit করলে:**
- User account তৈরি হয়
- localStorage-এ save হয়
- Student Dashboard-এ redirect হয়

#### Student Dashboard (শিক্ষক খুঁজুন)
**Features:**
- **Search Bar**: Name, Subject, Location দিয়ে search
- **Advanced Filters**:
  - Division (বিভাগ)
  - District (জেলা)
  - Area (এলাকা)
  - Medium (মিডিয়াম)
  - Class Level
  - Subjects
  - Price Range
  - Gender
  - Experience
  - Rating
  - Verified Only

- **Sort Options**:
  - Highest Rating
  - Lowest Price
  - Highest Price
  - Most Students
  - Experience

- **Teacher Cards Display**:
  - Teacher Avatar
  - Name & Title
  - Rating & Reviews
  - Location
  - Subjects
  - Classes
  - Price per Hour
  - "View Profile" button
  - "Book Now" button

#### Booking System
- Teacher select করে "Book Now" click করলে BookingModal opens
- Booking details:
  - Subject
  - Class Level
  - Preferred Date
  - Preferred Time
  - Duration
  - Message
- Submit করলে booking request তৈরি হয়
- localStorage-এ save হয়
- Teacher-কে notification যায়

---

### 3. **Teacher Features (শিক্ষক)**

#### Teacher Profile Creation
**4-Step Form Process:**

**Step 1: ব্যক্তিগত তথ্য**
- Email * (Account creation)
- Password * (Account creation)
- Confirm Password *
- Name *
- Phone *
- Location *
- Title/Designation *
- Profile Photo

**Step 2: বিষয় ও মূল্য**
- Classes to Teach * (Multiple selection)
- Subjects to Teach * (Class অনুযায়ী dynamic)
- Experience (Years) *
- Hourly Rate (টাকা) *

**Step 3: যোগ্যতা**
- Bio *
- Educational Qualifications * (Multiple entries)

**Step 4: নথি**
- Verification Documents (PDF, JPG, PNG)
- Availability Status

**Submit করলে:**
- Teacher profile তৈরি হয়
- **Pending Verification** (verified: false) - Admin check প্রয়োজন
- Admin Panel-এ pending list-এ দেখাবে
- localStorage-এ save হয়
- User account তৈরি হয়

#### Teachers List View
- সব teachers-এর list দেখায়
- Same filtering options as Student Dashboard
- "Create Profile" button (new teachers-এর জন্য)

---

### 4. **Home Page Features**

#### Hero Section
- Main search bar
- Quick filters:
  - Division
  - Area
  - Medium
  - Subject

#### Featured Tutors Section
- Top 6 teachers display
- Filtering:
  - Gender
  - Salary Range (Slider)
  - Availability
- **Priority**: Verified teachers আগে দেখায়, তারপর rating অনুযায়ী

#### Sidebar Filters
- Gender (All/Male/Female)
- Salary Range (Dual sliders)
- Availability (All/Morning/Evening)

---

### 5. **Data Persistence (localStorage)**

#### Saved Data:
1. **Teachers**: Custom created teachers (default teachers-এর সাথে merge)
2. **User**: Current logged-in user
3. **Bookings**: All booking requests
4. **Theme**: Light/Dark mode preference

#### How it Works:
- **On Page Load**: localStorage থেকে সব data load হয়
- **On Data Change**: Automatically localStorage-এ save হয়
- **Reload Safe**: Page reload করলেও data থাকে

---

### 6. **Admin Panel**

#### Features:
- **Teacher Verification**:
  - Pending teachers list
  - Verify/Reject buttons
  - Teacher details view

- **Booking Management**:
  - All booking requests
  - Approve/Reject bookings
  - Status updates

---

### 7. **Quiz Portal**
- Subject-based quiz system
- Multiple choice questions
- Score tracking

---

### 8. **Media Gallery**
- Video gallery
- Image gallery
- Category filtering
- Video player with controls

---

## 🔄 User Flow Diagrams

### Student Registration Flow:
```
Click "Login/Sign Up"
  ↓
Click "নিবন্ধন" tab
  ↓
Select "শিক্ষার্থী" role
  ↓
StudentProfileCreate form opens
  ↓
Fill 4-step form
  ↓
Submit
  ↓
Account created + localStorage saved
  ↓
Redirect to Student Dashboard
```

### Teacher Registration Flow:
```
Click "Login/Sign Up"
  ↓
Click "নিবন্ধন" tab
  ↓
Select "শিক্ষক" role
  ↓
TeacherProfileCreate form opens
  ↓
Fill 4-step form
  ↓
Submit
  ↓
Account created + Profile Pending Verification
  ↓
Admin approves profile
  ↓
Profile added to public list
  ↓
localStorage saved
  ↓
Redirect to Teachers List
```

### Booking Flow:
```
Student Dashboard
  ↓
Search/Filter teachers
  ↓
Click "Book Now" on teacher card
  ↓
BookingModal opens
  ↓
Fill booking details
  ↓
Submit
  ↓
Booking created + localStorage saved
  ↓
Teacher receives notification
```

---

## 🎨 UI/UX Features

### Theme System:
- **Light Mode**: Default
- **Dark Mode**: Toggle button in header
- Theme preference localStorage-এ save হয়

### Responsive Design:
- Mobile-friendly
- Tablet optimized
- Desktop full-featured

### Bengali Language Support:
- সব UI text বাংলায়
- Proper RTL support where needed

---

## 🔧 Technical Implementation

### State Management:
- React useState hooks
- Centralized state in App.jsx
- Props drilling for data flow

### Data Structure:

#### Teacher Object:
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  title: string,
  avatar: string,
  rating: number,
  reviews: number,
  experience: number,
  students: number,
  videos: number,
  subjects: array,
  classes: array,
  bio: string,
  qualifications: array,
  verified: boolean,
  location: string,
  district: string,
  area: string,
  medium: array,
  pricePerHour: number,
  available: boolean,
  gender: string
}
```

#### Student Object:
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  role: 'student',
  location: string,
  profileComplete: boolean,
  // ... other profile data
}
```

#### Booking Object:
```javascript
{
  id: string,
  studentId: string,
  studentName: string,
  tutorName: string,
  subject: string,
  classLevel: string,
  date: string,
  time: string,
  price: number,
  status: 'pending' | 'accepted' | 'rejected' | 'completed',
  createdAt: string
}
```

---

## 📱 Component Architecture

### Main Components:
1. **App.jsx**: Main container, state management, routing logic
2. **Header.jsx**: Navigation, theme toggle, user menu
3. **HomePage.jsx**: Landing page with search and featured tutors
4. **AuthModal.jsx**: Login/Registration modal with role selection
5. **StudentDashboard.jsx**: Student's teacher search interface
6. **StudentProfileCreate.jsx**: Student registration form
7. **TeachersList.jsx**: All teachers listing
8. **TeacherProfileCreate.jsx**: Teacher registration form
9. **TeacherProfile.jsx**: Individual teacher detail page
10. **BookingModal.jsx**: Booking request form
11. **AdminPanel.jsx**: Admin management interface
12. **QuizPortal.jsx**: Quiz system
13. **MediaGallery.jsx**: Media content gallery
14. **VideoPlayer.jsx**: Video playback

### Filter Components:
- **BangladeshSearchFilters.jsx**: Advanced filtering with Bangladesh locations
- **SearchFilters.jsx**: Basic search filters

---

## 🔐 Security & Validation

### Form Validation:
- Required field validation
- Email format validation
- Password strength (minimum 6 characters)
- Password confirmation matching
- Phone number validation

### Data Validation:
- Step-by-step form validation
- Error messages in Bengali
- Real-time error clearing

---

## 🚀 Performance Features

### Optimization:
- localStorage caching
- Efficient filtering algorithms
- Lazy loading for large lists
- Optimized re-renders

### User Experience:
- Instant search results
- Smooth transitions
- Loading states
- Error handling

---

## 📊 Data Flow

```
User Action
  ↓
Component Event Handler
  ↓
App.jsx State Update
  ↓
localStorage Save (if needed)
  ↓
Component Re-render
  ↓
UI Update
```

---

## 🎯 Key Features Summary

✅ **Role-based Registration** (Student/Teacher)
✅ **Multi-step Profile Creation**
✅ **Advanced Search & Filtering**
✅ **Booking System**
✅ **Auto-verification for Teachers**
✅ **Data Persistence (localStorage)**
✅ **Theme Toggle (Light/Dark)**
✅ **Responsive Design**
✅ **Bengali Language Support**
✅ **Admin Panel**
✅ **Quiz Portal**
✅ **Media Gallery**

---

## 🔮 Future Enhancements (Possible)

- Backend API integration
- Real-time notifications
- Payment integration
- Video calling feature
- Rating & Review system
- Messaging system
- Calendar integration
- Email notifications

---

## 📝 Notes

- সব data এখন localStorage-এ store হয় (production-এ backend লাগবে)
- Teacher profiles **Pending Verification** থাকে (admin check প্রয়োজন)
- Reload করলেও data persist হয়
- Default teachers predefined আছে, custom teachers আলাদা store হয়

---

**Last Updated**: Current implementation
**Version**: 1.0.0
