import React, { useState } from 'react'
import './Calendar.css'

function Calendar({ events = [], onDateClick }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    // Helper functions
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        setSelectedDate(newDate)
        if (onDateClick) {
            onDateClick(newDate)
        }
    }

    // Generate calendar days
    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDay = getFirstDayOfMonth(currentDate)
        const days = []

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const dateString = formatDate(date)

            // Check for events
            const dayEvents = events.filter(event => event.date === dateString)
            const hasEvents = dayEvents.length > 0
            const isSelected = selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.getFullYear() === currentDate.getFullYear()
            const isToday = new Date().getDate() === day &&
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear()

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    <span className="day-number">{day}</span>
                    {hasEvents && (
                        <div className="event-dots">
                            {dayEvents.slice(0, 3).map((_, idx) => (
                                <span key={idx} className="event-dot"></span>
                            ))}
                        </div>
                    )}
                </div>
            )
        }

        return days
    }

    const monthNames = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ]

    const weekDays = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি']

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={prevMonth}>&lt;</button>
                <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={nextMonth}>&gt;</button>
            </div>
            <div className="calendar-grid">
                <div className="weekdays-row">
                    {weekDays.map(day => (
                        <div key={day} className="weekday">{day}</div>
                    ))}
                </div>
                <div className="days-row">
                    {renderCalendarDays()}
                </div>
            </div>
        </div>
    )
}

export default Calendar
