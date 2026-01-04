import React, { useState } from 'react'
import { classLevels, locations, priceRanges, subjects } from '../data/subjects'
import './SearchFilters.css'

function SearchFilters({ onFilterChange, filters }) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubjectChange = (subject) => {
    const newSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter(s => s !== subject)
      : [...filters.subjects, subject]
    onFilterChange({ ...filters, subjects: newSubjects })
  }

  const handleClassChange = (classLevel) => {
    const newClasses = filters.classes.includes(classLevel)
      ? filters.classes.filter(c => c !== classLevel)
      : [...filters.classes, classLevel]
    onFilterChange({ ...filters, classes: newClasses })
  }

  const getAvailableSubjects = (): string[] => {
    const allSubjects = new Set<string>()
    filters.classes.forEach(classLevel => {
      const level = classLevels.find(c => c.value === classLevel)?.level
      if (level && subjects[level as keyof typeof subjects]) {
        const levelSubjects = subjects[level as keyof typeof subjects] as unknown as Record<string, string[]>
        Object.keys(levelSubjects).forEach(sub => allSubjects.add(sub))
      }
    })
    return Array.from(allSubjects)
  }

  return (
    <div className="search-filters">
      <div className="filters-header">
        <h3>শিক্ষক খুঁজুন</h3>
        <button
          className="toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'সরল ফিল্টার' : 'উন্নত ফিল্টার'}
        </button>
      </div>

      <div className="filters-grid">
        <div className="filter-section">
          <label>ক্লাস নির্বাচন করুন *</label>
          <div className="filter-chips">
            {classLevels.map(level => (
              <button
                key={level.value}
                type="button"
                className={`filter-chip ${filters.classes.includes(level.value) ? 'active' : ''}`}
                onClick={() => handleClassChange(level.value)}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {filters.classes.length > 0 && (
          <div className="filter-section">
            <label>বিষয় নির্বাচন করুন</label>
            <div className="filter-chips">
              {getAvailableSubjects().map(subject => (
                <button
                  key={subject}
                  type="button"
                  className={`filter-chip ${filters.subjects.includes(subject) ? 'active' : ''}`}
                  onClick={() => handleSubjectChange(subject)}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="filter-section">
          <label>অবস্থান</label>
          <select
            className="filter-select"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          >
            <option value="">সব অবস্থান</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <label>মূল্য পরিসীমা (টাকা/ঘণ্টা)</label>
          <select
            className="filter-select"
            value={filters.priceRange}
            onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
          >
            <option value="">সব মূল্য</option>
            {priceRanges.map((range, idx) => (
              <option key={idx} value={`${range.min}-${range.max}`}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <label>ন্যূনতম রেটিং</label>
          <select
            className="filter-select"
            value={filters.minRating}
            onChange={(e) => onFilterChange({ ...filters, minRating: e.target.value })}
          >
            <option value="0">সব রেটিং</option>
            <option value="4">৪+ ⭐</option>
            <option value="4.5">৪.৫+ ⭐</option>
            <option value="4.7">৪.৭+ ⭐</option>
            <option value="4.8">৪.৮+ ⭐</option>
            <option value="4.9">৪.৯+ ⭐</option>
          </select>
        </div>

        <div className="filter-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
            />
            <span>শুধুমাত্র যাচাইকৃত শিক্ষক</span>
          </label>
        </div>
      </div>

      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-section">
            <label>অভিজ্ঞতা (বছর)</label>
            <select
              className="filter-select"
              value={filters.experience}
              onChange={(e) => onFilterChange({ ...filters, experience: e.target.value })}
            >
              <option value="">সব</option>
              <option value="0-5">০-৫ বছর</option>
              <option value="5-10">৫-১০ বছর</option>
              <option value="10-15">১০-১৫ বছর</option>
              <option value="15+">১৫+ বছর</option>
            </select>
          </div>

          <div className="filter-section">
            <label>সাজান</label>
            <select
              className="filter-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
            >
              <option value="rating">সর্বোচ্চ রেটিং</option>
              <option value="price-low">কম মূল্য</option>
              <option value="price-high">বেশি মূল্য</option>
              <option value="students">সবচেয়ে শিক্ষার্থী</option>
              <option value="experience">অভিজ্ঞতা</option>
            </select>
          </div>
        </div>
      )}

      <div className="filter-actions">
        <button
          className="clear-filters"
          onClick={() => onFilterChange({
            classes: [],
            subjects: [],
            location: '',
            priceRange: '',
            verifiedOnly: false,
            minRating: '0',
            experience: '',
            sortBy: 'rating'
          })}
        >
          সব ফিল্টার সরান
        </button>
        <div className="active-filters-count">
          {[
            filters.classes.length,
            filters.subjects.length,
            filters.location ? 1 : 0,
            filters.priceRange ? 1 : 0,
            filters.verifiedOnly ? 1 : 0,
            filters.minRating !== '0' ? 1 : 0,
            filters.experience ? 1 : 0
          ].reduce((a, b) => a + b, 0)} টি ফিল্টার সক্রিয়
        </div>
      </div>
    </div>
  )
}

export default SearchFilters
