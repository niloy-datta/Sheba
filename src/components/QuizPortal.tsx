import React, { useState } from 'react'
import { quizSubjects, getTotalMarks, getChaptersBySubjectId } from '../data/quizSubjects'
import { physicsQuestions } from '../data/physicsQuestions'
import { mathQuestions } from '../data/mathQuestions'
import { chemistryQuestions } from '../data/chemistryQuestions'
import { biologyQuestions } from '../data/biologyQuestions'
import { higherMathQuestions } from '../data/higherMathQuestions'
import './QuizPortal.css'

function QuizPortal() {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState([])

  // Sample questions - in a real app, these would come from an API
  // Structure: subjectId_chapterId for chapter-based, or just subjectId for subject-based
  const sampleQuestions = {
    1: [
      {
        id: 1,
        question: 'বাংলা ভাষার আদি নিদর্শন কোনটি?',
        options: ['চর্যাপদ', 'মনসা মঙ্গল', 'শ্রীকৃষ্ণকীর্তন', 'পদ্মাবতী'],
        correct: 0
      },
      {
        id: 2,
        question: '"পদ্মা নদীর মাঝি" উপন্যাসের লেখক কে?',
        options: ['মানিক বন্দ্যোপাধ্যায়', 'তারাশঙ্কর বন্দ্যোপাধ্যায়', 'বিভূতিভূষণ বন্দ্যোপাধ্যায়', 'সমরেশ বসু'],
        correct: 0
      }
    ],
    2: [
      {
        id: 1,
        question: 'What is the synonym of "beautiful"?',
        options: ['Ugly', 'Pretty', 'Bad', 'Wrong'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which sentence is correct?',
        options: ['I am go to school', 'I go to school', 'I goes to school', 'I going to school'],
        correct: 1
      }
    ],
    3: [
      {
        id: 1,
        question: '2 + 2 = কত?',
        options: ['3', '4', '5', '6'],
        correct: 1
      },
      {
        id: 2,
        question: 'একটি বর্গক্ষেত্রের বাহুর দৈর্ঘ্য 5 হলে, ক্ষেত্রফল কত?',
        options: ['20', '25', '30', '35'],
        correct: 1
      }
    ],
    // Physics chapter questions are now in physicsQuestions.js file
    4: [
      {
        id: 1,
        question: 'নিউটনের গতি সূত্র কতটি?',
        options: ['2', '3', '4', '5'],
        correct: 1
      },
      {
        id: 2,
        question: 'বায়ুতে শব্দের বেগ প্রায় কত?',
        options: ['330 m/s', '340 m/s', '350 m/s', '360 m/s'],
        correct: 1
      }
    ],
    5: [
      {
        id: 1,
        question: 'জলের রাসায়নিক সংকেত কী?',
        options: ['H2O', 'CO2', 'NaCl', 'O2'],
        correct: 0
      },
      {
        id: 2,
        question: 'পিরিয়ডিক টেবিলে কতটি মৌল রয়েছে?',
        options: ['115', '118', '120', '125'],
        correct: 1
      }
    ]
  }

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject)
    setSelectedChapter(null)
    setQuizStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setQuizCompleted(false)
    setScore(0)
  }

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter)
    setQuizStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setQuizCompleted(false)
    setScore(0)
  }

  // Function to shuffle array randomly
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const getAllAvailableQuestions = () => {
    if (!selectedSubject) return []
    
    let allQuestions = []
    
    // If there's a selected chapter, use chapter-specific questions
    if (selectedChapter) {
      // Check subject-specific question files
      if (selectedSubject.id === 4 && physicsQuestions[selectedChapter.id]) {
        // Physics
        allQuestions = physicsQuestions[selectedChapter.id]
      } else if (selectedSubject.id === 3 && mathQuestions[selectedChapter.id]) {
        // General Mathematics
        allQuestions = mathQuestions[selectedChapter.id]
      } else if (selectedSubject.id === 5 && chemistryQuestions[selectedChapter.id]) {
        // Chemistry
        allQuestions = chemistryQuestions[selectedChapter.id]
      } else if (selectedSubject.id === 6 && biologyQuestions[selectedChapter.id]) {
        // Biology
        allQuestions = biologyQuestions[selectedChapter.id]
      } else if (selectedSubject.id === 7 && higherMathQuestions[selectedChapter.id]) {
        // Higher Mathematics
        allQuestions = higherMathQuestions[selectedChapter.id]
      } else {
        // Fallback to sample questions
        const chapterKey = `${selectedSubject.id}_${selectedChapter.id}`
        allQuestions = sampleQuestions[chapterKey] || sampleQuestions[selectedSubject.id] || []
      }
    } else {
      allQuestions = sampleQuestions[selectedSubject.id] || []
    }
    
    return allQuestions
  }

  const startQuiz = () => {
    if (selectedSubject && (!selectedSubject.hasChapters || selectedChapter)) {
      // Get all available questions
      const allQuestions = getAllAvailableQuestions()
      
      // Select 15 random questions
      let questionsToUse = []
      if (allQuestions.length > 15) {
        const shuffled = shuffleArray(allQuestions)
        questionsToUse = shuffled.slice(0, 15).map((q, index) => ({ ...q, id: index + 1 }))
      } else {
        // If less than 15 questions available, use all questions
        questionsToUse = allQuestions.map((q, index) => ({ ...q, id: index + 1 }))
      }
      
      setSelectedQuestions(questionsToUse)
      setQuizStarted(true)
      setCurrentQuestion(0)
      setAnswers({})
      setQuizCompleted(false)
      setScore(0)
    }
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    })
  }

  // Use selected questions from state if quiz has started, otherwise empty array
  const questions = quizStarted ? selectedQuestions : []

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      let correctAnswers = 0
      questions.forEach((q) => {
        if (answers[q.id] === q.correct) {
          correctAnswers++
        }
      })
      setScore(correctAnswers)
      setQuizCompleted(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleResetQuiz = () => {
    setSelectedSubject(null)
    setSelectedChapter(null)
    setQuizStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setQuizCompleted(false)
    setScore(0)
    setSelectedQuestions([])
  }

  const handleBackToSubject = () => {
    setSelectedChapter(null)
    setQuizStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setQuizCompleted(false)
    setScore(0)
    setSelectedQuestions([])
  }

  const totalMarks = getTotalMarks()

  return (
    <div className="quiz-portal">
      <div className="quiz-header">
        <h1>কুইজ পোর্টাল</h1>
        <p className="quiz-subtitle">আপনার জ্ঞান পরীক্ষা করুন এবং নিজেকে মূল্যায়ন করুন</p>
      </div>

      {!selectedSubject && !quizStarted && (
        <div className="quiz-content">
          <div className="quiz-stats">
            <div className="stat-card">
              <h3>মোট বিষয়</h3>
              <p className="stat-number">{quizSubjects.length}</p>
            </div>
            <div className="stat-card">
              <h3>মোট নম্বর</h3>
              <p className="stat-number">{totalMarks}</p>
            </div>
          </div>

          <div className="subjects-section">
            <h2 className="section-title">বিষয় নির্বাচন করুন</h2>
            <div className="subjects-grid">
              {quizSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="subject-card"
                  onClick={() => handleSubjectSelect(subject)}
                  style={{ borderColor: subject.color }}
                >
                  <div className="subject-icon" style={{ background: subject.color }}>
                    📚
                  </div>
                  <div className="subject-info">
                    <h3 className="subject-name">{subject.nameBn}</h3>
                    <p className="subject-name-en">{subject.name}</p>
                    <div className="subject-marks">
                      <span className="marks-label">মোট নম্বর:</span>
                      <span className="marks-value">{subject.marks}</span>
                    </div>
                    <p className="subject-description">{subject.description}</p>
                  </div>
                  <button className="select-subject-btn" style={{ background: subject.color }}>
                    নির্বাচন করুন
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedSubject && !selectedChapter && !quizStarted && !quizCompleted && selectedSubject.hasChapters && (
        <div className="chapters-selection-view">
          <div className="chapters-header">
            <button className="back-to-subjects-btn" onClick={handleResetQuiz}>
              ← বিষয় নির্বাচন করুন
            </button>
            <div className="chapters-title-section">
              <h2>{selectedSubject.nameBn}</h2>
              <p className="chapters-subtitle">অধ্যায় নির্বাচন করুন</p>
            </div>
          </div>
          <div className="chapters-grid">
            {getChaptersBySubjectId(selectedSubject.id).map((chapter) => (
              <div
                key={chapter.id}
                className="chapter-card"
                onClick={() => handleChapterSelect(chapter)}
                style={{ borderColor: selectedSubject.color }}
              >
                <div className="chapter-number" style={{ background: selectedSubject.color }}>
                  {chapter.number}
                </div>
                <div className="chapter-info">
                  <h3 className="chapter-name-bn">{chapter.nameBn}</h3>
                  <p className="chapter-name-en">{chapter.nameEn}</p>
                </div>
                <button className="select-chapter-btn" style={{ background: selectedSubject.color }}>
                  নির্বাচন করুন
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSubject && (!selectedSubject.hasChapters || selectedChapter) && !quizStarted && !quizCompleted && (
        <div className="selected-subject-view">
          <div className="selected-subject-card">
            <div className="selected-subject-header" style={{ background: selectedSubject.color }}>
              <h2>
                {selectedChapter 
                  ? `${selectedSubject.nameBn} - ${selectedChapter.nameBn}` 
                  : selectedSubject.nameBn}
              </h2>
              <p>
                {selectedChapter 
                  ? `${selectedSubject.name} - ${selectedChapter.nameEn}` 
                  : selectedSubject.name}
              </p>
            </div>
            <div className="selected-subject-details">
              {selectedChapter && (
                <div className="detail-item">
                  <span className="detail-label">অধ্যায়:</span>
                  <span className="detail-value">অধ্যায় {selectedChapter.number}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="detail-label">মোট নম্বর:</span>
                <span className="detail-value">{selectedSubject.marks}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">বিষয় বিবরণ:</span>
                <span className="detail-value">
                  {selectedChapter ? selectedChapter.nameBn : selectedSubject.description}
                </span>
              </div>
              <div className="quiz-instructions">
                <h3>নির্দেশাবলী:</h3>
                <ul>
                  <li>কুইজ শুরু করার জন্য নিচের বাটনে ক্লিক করুন</li>
                  <li>প্রতিটি প্রশ্নের উত্তর সঠিকভাবে দিন</li>
                  <li>সময় নিয়ে চিন্তা করুন</li>
                  <li>সমাপ্তির পর আপনার স্কোর দেখতে পাবেন</li>
                </ul>
              </div>
              <div className="quiz-actions">
                <button className="start-quiz-btn" onClick={startQuiz} style={{ background: selectedSubject.color }}>
                  কুইজ শুরু করুন
                </button>
                <button className="back-btn" onClick={selectedSubject.hasChapters ? handleBackToSubject : handleResetQuiz}>
                  {selectedSubject.hasChapters ? 'অধ্যায় নির্বাচন' : 'ফিরে যান'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {quizStarted && !quizCompleted && questions.length > 0 && (
        <div className="quiz-container">
          <div className="quiz-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  background: selectedSubject.color
                }}
              ></div>
            </div>
            <p className="progress-text">
              প্রশ্ন {currentQuestion + 1} / {questions.length}
            </p>
          </div>

          <div className="question-card">
            <div className="question-header">
              <h3>প্রশ্ন {currentQuestion + 1}</h3>
            </div>
            <div className="question-content">
              <p className="question-text">{questions[currentQuestion].question}</p>
              <div className="options-list">
                {questions[currentQuestion].options.map((option, index) => (
                  <label
                    key={index}
                    className={`option-item ${answers[questions[currentQuestion].id] === index ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                  >
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion].id}`}
                      value={index}
                      checked={answers[questions[currentQuestion].id] === index}
                      onChange={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                    />
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="question-navigation">
              <button
                className="nav-btn"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                ← পূর্ববর্তী
              </button>
              <button
                className="nav-btn next-btn"
                onClick={handleNextQuestion}
                style={{ background: selectedSubject.color }}
              >
                {currentQuestion === questions.length - 1 ? 'সমাপ্ত করুন' : 'পরবর্তী →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {quizCompleted && (
        <div className="quiz-result">
          <div className="result-card">
            <div className="result-header">
              <h2>কুইজ সম্পন্ন হয়েছে!</h2>
              <div className="result-score">
                <div className="score-circle" style={{ borderColor: selectedSubject.color }}>
                  <span className="score-number">{score}</span>
                  <span className="score-total">/ {questions.length}</span>
                </div>
                <p className="score-percentage">
                  {Math.round((score / questions.length) * 100)}%
                </p>
              </div>
            </div>
            <div className="result-details">
              <div className="result-item">
                <span>সঠিক উত্তর:</span>
                <span className="result-value correct">{score}</span>
              </div>
              <div className="result-item">
                <span>ভুল উত্তর:</span>
                <span className="result-value wrong">{questions.length - score}</span>
              </div>
              <div className="result-item">
                <span>মোট প্রশ্ন:</span>
                <span className="result-value">{questions.length}</span>
              </div>
            </div>
            <div className="result-actions">
              <button
                className="retry-btn"
                onClick={() => {
                  setQuizStarted(true)
                  setCurrentQuestion(0)
                  setAnswers({})
                  setQuizCompleted(false)
                  setScore(0)
                }}
                style={{ background: selectedSubject.color }}
              >
                আবার চেষ্টা করুন
              </button>
              <button 
                className="back-btn" 
                onClick={selectedSubject.hasChapters ? handleBackToSubject : handleResetQuiz}
              >
                {selectedSubject.hasChapters ? 'অধ্যায় নির্বাচন' : 'বিষয় নির্বাচন করুন'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedSubject && !quizStarted && questions.length === 0 && (
        <div className="no-questions-message">
          <p>
            {selectedChapter 
              ? `এই অধ্যায়ের জন্য এখনও কুইজ প্রস্তুত করা হয়নি।`
              : 'এই বিষয়ের জন্য এখনও কুইজ প্রস্তুত করা হয়নি।'}
          </p>
          <button className="back-btn" onClick={selectedSubject.hasChapters ? handleBackToSubject : handleResetQuiz}>
            {selectedSubject.hasChapters ? 'অধ্যায় নির্বাচন' : 'ফিরে যান'}
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizPortal
