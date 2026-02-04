# ShebaBD - Tuition Media Platform 🎓

A comprehensive tuition media platform for students and teachers in Bangladesh, built with React and TypeScript.

## 🌟 Features

### For Students (শিক্ষার্থীদের জন্য)

- 🔍 Advanced teacher search with filtering
- 📚 Search by subject, location, class level, and more
- 💰 Price range filtering
- ⭐ Rating and review system
- 📅 Easy booking system
- 🎯 Personalized learning preferences

### For Teachers (শিক্ষকদের জন্য)

- 👨‍🏫 Professional profile creation
- 📝 4-step registration process
- 🎓 Showcase qualifications and experience
- 💼 Set your own hourly rates
- ✅ Verification system
- 📊 Track your students and reviews

### Additional Features

- 🎥 Media gallery with videos
- 🧠 Quiz portal for practice
- 🌓 Dark/Light theme toggle
- 🇧🇩 Bengali language support
- 💾 Data persistence with localStorage
- 📱 Fully responsive design
- 🔐 Secure authentication system
- 👨‍💼 Admin panel for verification

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/niloy-datta/Sheba.git
cd Sheba
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
sheba/
├── src/
│   ├── components/          # All React components
│   │   ├── Header.tsx
│   │   ├── HomePage.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── TeachersList.tsx
│   │   ├── TeacherProfile.tsx
│   │   ├── AuthModal.tsx
│   │   ├── BookingModal.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── QuizPortal.tsx
│   │   └── ... (and more)
│   ├── data/                # Static data files
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Application entry point
│   └── index.css            # Global styles
├── public/                  # Public assets
├── package.json
└── README.md
```

## 🧪 Technologies Used

- **React 19** - UI framework
- **TypeScript 4.9** - Type safety
- **React Scripts 5.0** - Build tooling
- **CSS3** - Styling with modern features
- **localStorage** - Data persistence

## 📖 Key Components

### Student Features

- **StudentProfileCreate**: 4-step student registration
- **StudentDashboard**: Search and filter teachers
- **BangladeshSearchFilters**: Advanced location-based filtering

### Teacher Features

- **TeacherProfileCreate**: 4-step teacher registration
- **TeachersList**: Browse all verified teachers
- **TeacherProfile**: Detailed teacher information

### Core Features

- **AuthModal**: Login and registration
- **BookingModal**: Book a tuition session
- **AdminPanel**: Verify teachers and manage bookings
- **QuizPortal**: Subject-based quiz system
- **MediaGallery**: Video and image content

## 🎯 User Roles

1. **Student** - Search for teachers, book sessions
2. **Teacher** - Create profile, get verified, receive bookings
3. **Admin** - Verify teachers, manage bookings

## 🔒 Data Persistence

All data is stored in localStorage:

- User accounts and profiles
- Teacher listings
- Booking requests
- Theme preferences

## 📱 Responsive Design

The platform is fully responsive and works on:

- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktop computers

## 🌍 Language Support

- Full Bengali (বাংলা) language support
- Bilingual content for better accessibility

## 📄 Documentation

For detailed functionality documentation, see [FUNCTIONALITY_DETAILS.md](./FUNCTIONALITY_DETAILS.md)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Contact

- **Name**: Niloy Chandra Datta
- **GitHub**: [@niloy-datta](https://github.com/niloy-datta)
- **Repository**: [Sheba](https://github.com/niloy-datta/Sheba)

## 📝 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for the students and teachers of Bangladesh**
