// Quiz Subjects Data for Bangladesh SSC Level
export const quizSubjects = [
  {
    id: 1,
    name: 'Bangla (1st & 2nd)',
    nameBn: 'বাংলা (১ম ও ২য় পত্র)',
    marks: 200,
    description: 'বাংলা প্রথম ও দ্বিতীয় পত্র',
    color: '#10b981',
    hasChapters: false
  },
  {
    id: 2,
    name: 'English (1st & 2nd)',
    nameBn: 'ইংরেজি (১ম ও ২য় পত্র)',
    marks: 200,
    description: 'ইংরেজি প্রথম ও দ্বিতীয় পত্র',
    color: '#3b82f6',
    hasChapters: false
  },
  {
    id: 3,
    name: 'General Mathematics',
    nameBn: 'সাধারণ গণিত',
    marks: 100,
    description: 'সাধারণ গণিত বিষয়',
    color: '#f59e0b',
    hasChapters: true
  },
  {
    id: 4,
    name: 'Physics',
    nameBn: 'পদার্থবিজ্ঞান',
    marks: 100,
    description: 'পদার্থবিজ্ঞান বিষয়',
    color: '#8b5cf6',
    hasChapters: true
  },
  {
    id: 5,
    name: 'Chemistry',
    nameBn: 'রসায়ন',
    marks: 100,
    description: 'রসায়ন বিষয়',
    color: '#ef4444',
    hasChapters: true
  },
  {
    id: 6,
    name: 'Biology',
    nameBn: 'জীববিজ্ঞান',
    marks: 100,
    description: 'জীববিজ্ঞান বিষয়',
    color: '#06b6d4',
    hasChapters: true
  },
  {
    id: 7,
    name: 'Higher Mathematics',
    nameBn: 'উচ্চতর গণিত',
    marks: 100,
    description: 'উচ্চতর গণিত বিষয়',
    color: '#ec4899',
    hasChapters: true
  },
  {
    id: 8,
    name: 'Religion & Moral Education',
    nameBn: 'ধর্ম ও নৈতিক শিক্ষা',
    marks: 100,
    description: 'ধর্ম ও নৈতিক শিক্ষা বিষয়',
    color: '#14b8a6',
    hasChapters: false
  },
  {
    id: 9,
    name: 'ICT',
    nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    marks: 50,
    description: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    color: '#6366f1',
    hasChapters: false
  },
  {
    id: 10,
    name: 'Bangladesh & Global Studies',
    nameBn: 'বাংলাদেশ ও বিশ্বপরিচয়',
    marks: 100,
    description: 'বাংলাদেশ ও বিশ্বপরিচয় বিষয়',
    color: '#f97316',
    hasChapters: false
  }
]

// Physics Chapters according to NCTB Curriculum
export const physicsChapters = [
  {
    id: 1,
    number: 1,
    nameBn: 'ভৌত রাশি ও পরিমাপ',
    nameEn: 'Physical Quantities and Measurement',
    subjectId: 4
  },
  {
    id: 2,
    number: 2,
    nameBn: 'গতি',
    nameEn: 'Motion',
    subjectId: 4
  },
  {
    id: 3,
    number: 3,
    nameBn: 'বল',
    nameEn: 'Force',
    subjectId: 4
  },
  {
    id: 4,
    number: 4,
    nameBn: 'কাজ, ক্ষমতা ও শক্তি',
    nameEn: 'Work, Power, and Energy',
    subjectId: 4
  },
  {
    id: 5,
    number: 5,
    nameBn: 'পদার্থের অবস্থা ও চাপ',
    nameEn: 'States of Matter and Pressure',
    subjectId: 4
  },
  {
    id: 6,
    number: 6,
    nameBn: 'বস্তুর ওপর তাপের প্রভাব',
    nameEn: 'Effect of Heat on Matter',
    subjectId: 4
  },
  {
    id: 7,
    number: 7,
    nameBn: 'তরঙ্গ ও শব্দ',
    nameEn: 'Waves and Sound',
    subjectId: 4
  },
  {
    id: 8,
    number: 8,
    nameBn: 'আলোর প্রতিফলন',
    nameEn: 'Reflection of Light',
    subjectId: 4
  },
  {
    id: 9,
    number: 9,
    nameBn: 'আলোর প্রতিসরণ',
    nameEn: 'Refraction of Light',
    subjectId: 4
  },
  {
    id: 10,
    number: 10,
    nameBn: 'স্থির বিদ্যুৎ',
    nameEn: 'Static Electricity',
    subjectId: 4
  },
  {
    id: 11,
    number: 11,
    nameBn: 'চল বিদ্যুৎ',
    nameEn: 'Current Electricity',
    subjectId: 4
  },
  {
    id: 12,
    number: 12,
    nameBn: 'বিদ্যুতের চৌম্বক ক্রিয়া',
    nameEn: 'Magnetic Effect of Current',
    subjectId: 4
  },
  {
    id: 13,
    number: 13,
    nameBn: 'আধুনিক পদার্থবিজ্ঞান ও ইলেকট্রনিক্স',
    nameEn: 'Modern Physics and Electronics',
    subjectId: 4
  },
  {
    id: 14,
    number: 14,
    nameBn: 'জীবন বাঁচাতে পদার্থবিজ্ঞান',
    nameEn: 'Physics to Save Life',
    subjectId: 4
  }
]

// General Mathematics Chapters according to NCTB Curriculum
export const mathChapters = [
  // Algebra (বীজগণিত)
  { id: 1, number: 1, nameBn: 'বাস্তব সংখ্যা', nameEn: 'Real Number', subjectId: 3, category: 'Algebra' },
  { id: 2, number: 2, nameBn: 'সেট ও ফাংশন', nameEn: 'Set and Function', subjectId: 3, category: 'Algebra' },
  { id: 3, number: 3, nameBn: 'বীজগাণিতিক রাশি', nameEn: 'Algebraic Expressions', subjectId: 3, category: 'Algebra' },
  { id: 4, number: 4, nameBn: 'সূচক ও লগারিদম', nameEn: 'Exponents and Logarithms', subjectId: 3, category: 'Algebra' },
  { id: 5, number: 5, nameBn: 'এক চলকবিশিষ্ট সমীকরণ', nameEn: 'Equations with One Variable', subjectId: 3, category: 'Algebra' },
  { id: 11, number: 11, nameBn: 'বীজগাণিতিক অনুপাত ও সমানুপাত', nameEn: 'Algebraic Ratio and Proportion', subjectId: 3, category: 'Algebra' },
  { id: 12, number: 12, nameBn: 'দুই চলকবিশিষ্ট সরল সহসমীকরণ', nameEn: 'Simple Simultaneous Equations with Two Variables', subjectId: 3, category: 'Algebra' },
  { id: 13, number: 13, nameBn: 'সসীম ধারা', nameEn: 'Finite Series', subjectId: 3, category: 'Algebra' },
  // Geometry (জ্যামিতি)
  { id: 6, number: 6, nameBn: 'রেখা, কোণ ও ত্রিভুজ', nameEn: 'Lines, Angles and Triangles', subjectId: 3, category: 'Geometry' },
  { id: 7, number: 7, nameBn: 'ব্যবহারিক জ্যামিতি', nameEn: 'Practical Geometry', subjectId: 3, category: 'Geometry' },
  { id: 8, number: 8, nameBn: 'বৃত্ত', nameEn: 'Circle', subjectId: 3, category: 'Geometry' },
  { id: 14, number: 14, nameBn: 'অনুপাত, সদৃশতা ও প্রতিসাম্য', nameEn: 'Ratio, Similarity and Symmetry', subjectId: 3, category: 'Geometry' },
  { id: 15, number: 15, nameBn: 'ক্ষেত্রফল সম্পর্কিত উপপাদ্য ও সম্পাদ্য', nameEn: 'Area Related Theorems and Constructions', subjectId: 3, category: 'Geometry' },
  // Trigonometry & Mensuration (ত্রিকোণমিতি ও পরিমিতি)
  { id: 9, number: 9, nameBn: 'ত্রিকোণমিতিক অনুপাত', nameEn: 'Trigonometric Ratio', subjectId: 3, category: 'Trigonometry' },
  { id: 10, number: 10, nameBn: 'দূরত্ব ও উচ্চতা', nameEn: 'Distance and Elevation', subjectId: 3, category: 'Trigonometry' },
  { id: 16, number: 16, nameBn: 'পরিমিতি', nameEn: 'Mensuration', subjectId: 3, category: 'Trigonometry' },
  // Statistics (পরিসংখ্যান)
  { id: 17, number: 17, nameBn: 'পরিসংখ্যান', nameEn: 'Statistics', subjectId: 3, category: 'Statistics' }
]

// Chemistry Chapters (SSC Level) - 12 chapters
export const chemistryChapters = [
  { id: 1, number: 1, nameBn: 'পরমাণুর গঠন', nameEn: 'Atomic Structure', subjectId: 5 },
  { id: 2, number: 2, nameBn: 'পর্যায় সারণি', nameEn: 'Periodic Table', subjectId: 5 },
  { id: 3, number: 3, nameBn: 'রাসায়নিক বন্ধন', nameEn: 'Chemical Bonding', subjectId: 5 },
  { id: 4, number: 4, nameBn: 'রাসায়নিক বিক্রিয়া', nameEn: 'Chemical Reactions', subjectId: 5 },
  { id: 5, number: 5, nameBn: 'অ্যাসিড-ক্ষার-লবণ', nameEn: 'Acid-Base-Salt', subjectId: 5 },
  { id: 6, number: 6, nameBn: 'জারণ-বিজারণ', nameEn: 'Oxidation-Reduction', subjectId: 5 },
  { id: 7, number: 7, nameBn: 'জল', nameEn: 'Water', subjectId: 5 },
  { id: 8, number: 8, nameBn: 'খনিজ সম্পদ', nameEn: 'Mineral Resources', subjectId: 5 },
  { id: 9, number: 9, nameBn: 'জৈব যৌগ', nameEn: 'Organic Compounds', subjectId: 5 },
  { id: 10, number: 10, nameBn: 'কৃত্রিম সার', nameEn: 'Fertilizers', subjectId: 5 },
  { id: 11, number: 11, nameBn: 'রাসায়নিক শিল্প', nameEn: 'Chemical Industry', subjectId: 5 },
  { id: 12, number: 12, nameBn: 'রাসায়নিক পরিবেশ', nameEn: 'Chemical Environment', subjectId: 5 }
]

// Biology Chapters (SSC Level) - 12 chapters
export const biologyChapters = [
  { id: 1, number: 1, nameBn: 'জীব ও জীবের বাসস্থান', nameEn: 'Life and Habitat', subjectId: 6 },
  { id: 2, number: 2, nameBn: 'কোষ ও এর গঠন', nameEn: 'Cell and its Structure', subjectId: 6 },
  { id: 3, number: 3, nameBn: 'কোষ বিভাজন', nameEn: 'Cell Division', subjectId: 6 },
  { id: 4, number: 4, nameBn: 'জীবনের উৎপত্তি', nameEn: 'Origin of Life', subjectId: 6 },
  { id: 5, number: 5, nameBn: 'জীবের শ্রেণিবিন্যাস', nameEn: 'Classification of Organisms', subjectId: 6 },
  { id: 6, number: 6, nameBn: 'উদ্ভিদের জীবন', nameEn: 'Plant Life', subjectId: 6 },
  { id: 7, number: 7, nameBn: 'প্রাণীর জীবন', nameEn: 'Animal Life', subjectId: 6 },
  { id: 8, number: 8, nameBn: 'মানব শরীর', nameEn: 'Human Body', subjectId: 6 },
  { id: 9, number: 9, nameBn: 'খাদ্য ও পুষ্টি', nameEn: 'Food and Nutrition', subjectId: 6 },
  { id: 10, number: 10, nameBn: 'রোগ-জীবাণু', nameEn: 'Disease-Causing Organisms', subjectId: 6 },
  { id: 11, number: 11, nameBn: 'জীবনের পরিবর্তন', nameEn: 'Changes in Life', subjectId: 6 },
  { id: 12, number: 12, nameBn: 'প্রকৃতি ও পরিবেশ', nameEn: 'Nature and Environment', subjectId: 6 }
]

// Higher Mathematics Chapters (SSC Level) - 13 chapters
export const higherMathChapters = [
  { id: 1, number: 1, nameBn: 'বাস্তব সংখ্যা', nameEn: 'Real Numbers', subjectId: 7 },
  { id: 2, number: 2, nameBn: 'সেট ও ফাংশন', nameEn: 'Sets and Functions', subjectId: 7 },
  { id: 3, number: 3, nameBn: 'বীজগাণিতিক রাশি', nameEn: 'Algebraic Expressions', subjectId: 7 },
  { id: 4, number: 4, nameBn: 'সূচক ও লগারিদম', nameEn: 'Exponents and Logarithms', subjectId: 7 },
  { id: 5, number: 5, nameBn: 'বহুপদী', nameEn: 'Polynomials', subjectId: 7 },
  { id: 6, number: 6, nameBn: 'দ্বিঘাত সমীকরণ', nameEn: 'Quadratic Equations', subjectId: 7 },
  { id: 7, number: 7, nameBn: 'অনুক্রম ও ধারা', nameEn: 'Sequences and Series', subjectId: 7 },
  { id: 8, number: 8, nameBn: 'ত্রিকোণমিতি', nameEn: 'Trigonometry', subjectId: 7 },
  { id: 9, number: 9, nameBn: 'সরলরেখা', nameEn: 'Straight Lines', subjectId: 7 },
  { id: 10, number: 10, nameBn: 'বৃত্ত', nameEn: 'Circle', subjectId: 7 },
  { id: 11, number: 11, nameBn: 'কোনিক', nameEn: 'Conic Sections', subjectId: 7 },
  { id: 12, number: 12, nameBn: 'জ্যামিতিক স্থানাঙ্ক', nameEn: 'Geometric Coordinates', subjectId: 7 },
  { id: 13, number: 13, nameBn: 'আয়তল ও ঘনক', nameEn: 'Plane and Solid Geometry', subjectId: 7 }
]

export const getAllChaptersBySubjectId = (subjectId) => {
  if (subjectId === 4) {
    return physicsChapters.filter(chapter => chapter.subjectId === subjectId)
  } else if (subjectId === 3) {
    return mathChapters.filter(chapter => chapter.subjectId === subjectId)
  } else if (subjectId === 5) {
    return chemistryChapters.filter(chapter => chapter.subjectId === subjectId)
  } else if (subjectId === 6) {
    return biologyChapters.filter(chapter => chapter.subjectId === subjectId)
  } else if (subjectId === 7) {
    return higherMathChapters.filter(chapter => chapter.subjectId === subjectId)
  }
  return []
}

export const getChaptersBySubjectId = getAllChaptersBySubjectId

export const getTotalMarks = () => {
  return quizSubjects.reduce((total, subject) => total + subject.marks, 0)
}
