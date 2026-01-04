import React, { useState } from 'react'
import './MediaGallery.css'

function MediaGallery({ onVideoSelect, teachers }) {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedClass, setSelectedClass] = useState('all')

  // Sample media data - Bangladesh focused
  const videos = [
    {
      id: 1,
      title: 'Cox\'s Bazar - World\'s Longest Beach',
      thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
      duration: '8:45',
      views: '45.2K',
      category: 'nature'
    },
    {
      id: 2,
      title: 'Dhaka City - Capital of Bangladesh',
      thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
      duration: '6:30',
      views: '38.7K',
      category: 'urban'
    },
    {
      id: 3,
      title: 'Sundarbans Mangrove Forest',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      duration: '12:15',
      views: '52.1K',
      category: 'nature'
    },
    {
      id: 4,
      title: 'Sylhet Tea Gardens',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      duration: '7:20',
      views: '29.8K',
      category: 'nature'
    },
    {
      id: 5,
      title: 'Old Dhaka Heritage',
      thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
      duration: '5:45',
      views: '33.4K',
      category: 'urban'
    },
    {
      id: 6,
      title: 'Padma River Journey',
      thumbnail: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
      duration: '9:30',
      views: '41.6K',
      category: 'nature'
    },
    // Primary Level (Class 1-5)
    {
      id: 7,
      title: 'Class 1 - বাংলা বর্ণমালা',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      duration: '15:20',
      views: '125.5K',
      category: 'education',
      classLevel: '1',
      teacherId: 3
    },
    {
      id: 8,
      title: 'Class 2 - Basic Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      duration: '18:30',
      views: '98.3K',
      category: 'education',
      classLevel: '2',
      teacherId: 5
    },
    {
      id: 9,
      title: 'Class 3 - English Alphabet',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      duration: '20:15',
      views: '112.7K',
      category: 'education',
      classLevel: '3',
      teacherId: 3
    },
    {
      id: 10,
      title: 'Class 4 - Science Basics',
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b4?w=800',
      duration: '22:45',
      views: '105.2K',
      category: 'education',
      classLevel: '4',
      teacherId: 5
    },
    {
      id: 11,
      title: 'Class 5 - Social Studies',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
      duration: '25:30',
      views: '108.9K',
      category: 'education',
      classLevel: '5',
      teacherId: 5
    },
    // Secondary Level (Class 6-10)
    {
      id: 12,
      title: 'Class 6 - Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      duration: '28:20',
      views: '95.6K',
      category: 'education',
      classLevel: '6'
    },
    {
      id: 13,
      title: 'Class 7 - Science',
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b4?w=800',
      duration: '30:15',
      views: '89.4K',
      category: 'education',
      classLevel: '7'
    },
    {
      id: 14,
      title: 'Class 8 - English Grammar',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      duration: '32:40',
      views: '102.3K',
      category: 'education',
      classLevel: '8'
    },
    {
      id: 15,
      title: 'Class 9 - Physics',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
      duration: '35:25',
      views: '115.8K',
      category: 'education',
      classLevel: '9',
      teacherId: 1
    },
    {
      id: 16,
      title: 'Class 10 - SSC Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      duration: '40:30',
      views: '142.5K',
      category: 'education',
      classLevel: '10',
      teacherId: 1
    },
    {
      id: 17,
      title: 'Class 10 - SSC Chemistry',
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b4?w=800',
      duration: '38:15',
      views: '138.7K',
      category: 'education',
      classLevel: '10',
      teacherId: 2
    },
    {
      id: 18,
      title: 'Class 10 - SSC Biology',
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b4?w=800',
      duration: '36:50',
      views: '135.2K',
      category: 'education',
      classLevel: '10',
      teacherId: 6
    },
    // Higher Secondary Level (Class 11-12)
    {
      id: 19,
      title: 'Class 11 - HSC Physics',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
      duration: '45:20',
      views: '128.9K',
      category: 'education',
      classLevel: '11',
      teacherId: 4
    },
    {
      id: 20,
      title: 'Class 11 - HSC Chemistry',
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b4?w=800',
      duration: '42:35',
      views: '125.6K',
      category: 'education',
      classLevel: '11',
      teacherId: 2
    },
    {
      id: 21,
      title: 'Class 11 - HSC Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      duration: '48:10',
      views: '132.4K',
      category: 'education',
      classLevel: '11',
      teacherId: 1
    },
    {
      id: 22,
      title: 'Class 12 - HSC Physics',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
      duration: '50:25',
      views: '148.3K',
      category: 'education',
      classLevel: '12',
      teacherId: 4
    },
    {
      id: 23,
      title: 'Class 12 - HSC Chemistry',
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b4?w=800',
      duration: '47:40',
      views: '145.7K',
      category: 'education',
      classLevel: '12',
      teacherId: 2
    },
    {
      id: 24,
      title: 'Class 12 - HSC Mathematics',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      duration: '52:15',
      views: '152.1K',
      category: 'education',
      classLevel: '12',
      teacherId: 1
    },
    {
      id: 25,
      title: 'Class 12 - HSC Biology',
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b4?w=800',
      duration: '49:30',
      views: '139.8K',
      category: 'education',
      classLevel: '12',
      teacherId: 2
    }
  ]

  const images = [
    {
      id: 1,
      title: 'Cox\'s Bazar Beach',
      url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600',
      category: 'nature'
    },
    {
      id: 2,
      title: 'Dhaka Skyline',
      url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600',
      category: 'urban'
    },
    {
      id: 3,
      title: 'Sundarbans Wildlife',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600',
      category: 'nature'
    },
    {
      id: 4,
      title: 'Sylhet Tea Estate',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      category: 'nature'
    },
    {
      id: 5,
      title: 'Class 1-5 Study Materials',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
      category: 'education'
    },
    {
      id: 6,
      title: 'Class 6-10 SSC Preparation',
      url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
      category: 'education'
    },
    {
      id: 7,
      title: 'Class 11-12 HSC Preparation',
      url: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed2b4?w=600',
      category: 'education'
    },
    {
      id: 8,
      title: 'Online Tuition Bangladesh',
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600',
      category: 'education'
    }
  ]

  const filteredVideos = activeTab === 'all' 
    ? videos 
    : videos.filter(v => v.category === activeTab)

  // Filter by class level if education is selected
  const classFilteredVideos = activeTab === 'education' && selectedClass !== 'all'
    ? filteredVideos.filter(v => v.classLevel === selectedClass)
    : filteredVideos

  const filteredImages = activeTab === 'all' 
    ? images 
    : images.filter(i => i.category === activeTab)

  return (
    <div className="media-gallery">
      <div className="gallery-header">
        <h2>মিডিয়া গ্যালারি - বাংলাদেশ</h2>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            সব
          </button>
          <button 
            className={`tab ${activeTab === 'nature' ? 'active' : ''}`}
            onClick={() => setActiveTab('nature')}
          >
            প্রকৃতি
          </button>
          <button 
            className={`tab ${activeTab === 'urban' ? 'active' : ''}`}
            onClick={() => setActiveTab('urban')}
          >
            শহর
          </button>
          <button 
            className={`tab ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            শিক্ষা
          </button>
        </div>
      </div>

      <section className="videos-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 className="section-title">ভিডিও</h3>
          {activeTab === 'education' && (
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              <option value="all">সব ক্লাস</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10 (SSC)</option>
              <option value="11">Class 11 (HSC)</option>
              <option value="12">Class 12 (HSC)</option>
            </select>
          )}
        </div>
        <div className="video-grid">
          {classFilteredVideos.map(video => (
            <div 
              key={video.id} 
              className="video-card"
              onClick={() => onVideoSelect(video)}
            >
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-overlay">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span className="duration">{video.duration}</span>
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <p className="views">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="images-section">
        <h3 className="section-title">ছবি</h3>
        <div className="image-grid">
          {filteredImages.map(image => (
            <div key={image.id} className="image-card">
              <img src={image.url} alt={image.title} />
              <div className="image-overlay">
                <h4>{image.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MediaGallery
