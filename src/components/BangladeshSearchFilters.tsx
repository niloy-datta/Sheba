import React, { useState } from 'react'
import { districts, districtAreas, mediums, classLevels } from '../data/bangladeshLocations'
import { subjects, priceRanges } from '../data/subjects'
import './BangladeshSearchFilters.css'

interface Filters {
  district: string;
  area: string;
  medium: string;
  classes: string[];
  subjects: string[];
  location: string;
  priceRange: string;
  verifiedOnly: boolean;
  minRating: string;
  experience: string;
  sortBy: string;
  gender: string;
  salaryMin: number;
  salaryMax: number;
}

interface BangladeshSearchFiltersProps {
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
}

function BangladeshSearchFilters({ onFilterChange, filters }: BangladeshSearchFiltersProps) {
  const [selectedDistrict, setSelectedDistrict] = useState(filters.district || '')
  const [selectedMedium, setSelectedMedium] = useState(filters.medium || '')

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district)
    onFilterChange({
      ...filters,
      district: district,
      area: '' // Reset area when district changes
    })
  }

  const handleAreaChange = (area: string) => {
    onFilterChange({ ...filters, area })
  }

  const handleMediumChange = (medium: string) => {
    setSelectedMedium(medium)
    onFilterChange({
      ...filters,
      medium: medium,
      classes: [], // Reset classes when medium changes
      subjects: [] // Reset subjects when medium changes
    })
  }

  const handleClassChange = (classLevel: string) => {
    const newClasses = filters.classes.includes(classLevel)
      ? filters.classes.filter((c: string) => c !== classLevel)
      : [...filters.classes, classLevel]
    onFilterChange({ ...filters, classes: newClasses })
  }

  const handleSubjectChange = (subject: string) => {
    const newSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter((s: string) => s !== subject)
      : [...filters.subjects, subject]
    onFilterChange({ ...filters, subjects: newSubjects })
  }

  const getAvailableAreas = (): string[] => {
    if (!selectedDistrict || !districtAreas[selectedDistrict as keyof typeof districtAreas]) return []
    return districtAreas[selectedDistrict as keyof typeof districtAreas]
  }

  const getAvailableClasses = (): any[] => {
    if (!selectedMedium || !classLevels[selectedMedium as keyof typeof classLevels]) return []
    return classLevels[selectedMedium as keyof typeof classLevels]
  }

  const getAvailableSubjects = (): string[] => {
    if (!selectedMedium || !subjects[selectedMedium as keyof typeof subjects]) return []

    const allSubjects = new Set<string>()
    const mediumSubjects = subjects[selectedMedium as keyof typeof subjects] as Record<string, Record<string, string[]>>

    // Get subjects based on selected classes
    filters.classes.forEach((classLevel: string) => {
      Object.keys(mediumSubjects).forEach((level: string) => {
        if (mediumSubjects[level]) {
          Object.keys(mediumSubjects[level]).forEach((sub: string) => allSubjects.add(sub))
        }
      })
    })

    // If no classes selected, show all subjects for the medium
    if (filters.classes.length === 0) {
      Object.values(mediumSubjects).forEach((level: any) => {
        if (level) {
          Object.keys(level).forEach((sub: string) => allSubjects.add(sub))
        }
      })
    }

    return Array.from(allSubjects)
  }

  const clearAllFilters = () => {
    setSelectedDistrict('')
    setSelectedMedium('')
    onFilterChange({
      district: '',
      area: '',
      medium: '',
      classes: [],
      subjects: [],
      location: '',
      priceRange: '',
      verifiedOnly: false,
      minRating: '0',
      experience: '',
      sortBy: 'rating',
      gender: 'all',
      salaryMin: 100,
      salaryMax: 10000
    })
  }

  const activeFiltersCount = [
    filters.district ? 1 : 0,
    filters.area ? 1 : 0,
    filters.medium ? 1 : 0,
    filters.classes.length,
    filters.subjects.length,
    filters.priceRange ? 1 : 0,
    filters.verifiedOnly ? 1 : 0,
    filters.minRating !== '0' ? 1 : 0
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="bangladesh-search-filters">
      <div className="filters-header">
        <h3>🔍 শিক্ষক খুঁজুন - বাংলাদেশ</h3>
        <div className="active-filters-badge">
          {activeFiltersCount} টি ফিল্টার সক্রিয়
        </div>
      </div>

      <div className="filters-container">
        {/* Location Filters - District & Area */}
        <div className="filter-group location-group">
          <h4>📍 অবস্থান</h4>
          <div className="location-filters">
            <div className="filter-field">
              <label>জেলা *</label>
              <select
                className="filter-select"
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
              >
                <option value="">জেলা নির্বাচন করুন</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            {selectedDistrict && getAvailableAreas().length > 0 && (
              <div className="filter-field">
                <label>এলাকা</label>
                <select
                  className="filter-select"
                  value={filters.area || ''}
                  onChange={(e) => handleAreaChange(e.target.value)}
                >
                  <option value="">সব এলাকা</option>
                  {getAvailableAreas().map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Medium Selection */}
        <div className="filter-group medium-group">
          <h4>📚 মিডিয়াম</h4>
          <div className="medium-chips">
            {mediums.map(medium => (
              <button
                key={medium}
                type="button"
                className={`medium-chip ${filters.medium === medium ? 'active' : ''}`}
                onClick={() => handleMediumChange(medium)}
              >
                {medium}
              </button>
            ))}
          </div>
        </div>

        {/* Class/Level Selection */}
        {selectedMedium && getAvailableClasses().length > 0 && (
          <div className="filter-group class-group">
            <h4>🎓 ক্লাস/লেভেল</h4>
            <div className="class-chips">
              {getAvailableClasses().map(level => (
                <button
                  key={level.value}
                  type="button"
                  className={`class-chip ${filters.classes.includes(level.value) ? 'active' : ''}`}
                  onClick={() => handleClassChange(level.value)}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Subject Selection */}
        {selectedMedium && getAvailableSubjects().length > 0 && (
          <div className="filter-group subject-group">
            <h4>📖 বিষয়</h4>
            <div className="subject-chips">
              {getAvailableSubjects().map(subject => (
                <button
                  key={subject}
                  type="button"
                  className={`subject-chip ${filters.subjects.includes(subject) ? 'active' : ''}`}
                  onClick={() => handleSubjectChange(subject)}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Additional Filters */}
        <div className="filter-group additional-filters">
          <h4>⚙️ অতিরিক্ত ফিল্টার</h4>
          <div className="additional-filters-grid">
            <div className="filter-field">
              <label>মূল্য পরিসীমা (টাকা/ঘণ্টা)</label>
              <select
                className="filter-select"
                value={filters.priceRange || ''}
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

            <div className="filter-field">
              <label>ন্যূনতম রেটিং</label>
              <select
                className="filter-select"
                value={filters.minRating || '0'}
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

            <div className="filter-field checkbox-field">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly || false}
                  onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
                />
                <span>শুধুমাত্র যাচাইকৃত শিক্ষক</span>
              </label>
            </div>
          </div>
        </div>

        {/* Popular Search Tags */}
        <div className="filter-group popular-tags">
          <h4>🔥 জনপ্রিয় সার্চ</h4>
          <div className="popular-tags-list">
            <button
              type="button"
              className="popular-tag"
              onClick={() => {
                handleDistrictChange('ঢাকা')
                handleAreaChange('মিরপুর')
                handleMediumChange('বাংলা মিডিয়াম')
              }}
            >
              Physics Tutor in Mirpur
            </button>
            <button
              type="button"
              className="popular-tag"
              onClick={() => {
                handleDistrictChange('ঢাকা')
                handleAreaChange('উত্তরা')
                handleMediumChange('ইংরেজি মিডিয়াম (O/A Level)')
              }}
            >
              O-Level Math Tutor Uttara
            </button>
            <button
              type="button"
              className="popular-tag"
              onClick={() => {
                handleDistrictChange('ঢাকা')
                handleMediumChange('বাংলা মিডিয়াম')
                onFilterChange({ ...filters, classes: ['12'] })
              }}
            >
              HSC Math Tutor Dhaka
            </button>
            <button
              type="button"
              className="popular-tag"
              onClick={() => {
                handleDistrictChange('ঢাকা')
                handleMediumChange('বাংলা মিডিয়াম')
                onFilterChange({ ...filters, classes: ['10'] })
              }}
            >
              SSC Physics Tutor
            </button>
          </div>
        </div>
      </div>

      <div className="filter-actions">
        <button className="clear-all-button" onClick={clearAllFilters}>
          🗑️ সব ফিল্টার সরান
        </button>
      </div>
    </div>
  )
}

export default BangladeshSearchFilters
