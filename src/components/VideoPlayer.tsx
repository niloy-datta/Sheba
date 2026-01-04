import React from 'react'
import './VideoPlayer.css'

function VideoPlayer({ video, onBack, teachers }) {
  if (!video) {
    return (
      <div className="video-player">
        <p>No video selected</p>
      </div>
    )
  }

  // Find teacher for this video
  const teacher = video.teacherId && teachers 
    ? teachers.find(t => t.id === video.teacherId)
    : null

  // Using a placeholder video URL - replace with actual video URLs
  const videoUrl = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${video.id === 1 ? 'BigBuckBunny' : video.id === 2 ? 'ElephantsDream' : 'ForBiggerBlazes'}.mp4`

  return (
    <div className="video-player">
      <div className="player-container">
        <div className="video-wrapper">
          <video 
            controls 
            autoPlay
            className="video-element"
            poster={video.thumbnail}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-details">
          <h2 className="video-title">{video.title}</h2>
          <div className="video-meta">
            <span className="views">{video.views} views</span>
            <span className="duration">Duration: {video.duration}</span>
            <span className="category">Category: {video.category}</span>
            {video.classLevel && (
              <span className="class-level">Class: {video.classLevel}</span>
            )}
          </div>
          <div className="video-description">
            <p>
              {video.category === 'education' 
                ? `${video.title} - এই ভিডিওতে Class ${video.classLevel} এর শিক্ষার্থীদের জন্য প্রয়োজনীয় বিষয়বস্তু শেখানো হয়েছে। ${video.classLevel === '10' ? 'SSC' : video.classLevel === '11' || video.classLevel === '12' ? 'HSC' : ''} পরীক্ষার প্রস্তুতির জন্য এই টিউটোরিয়ালটি খুবই উপকারী।`
                : video.category === 'nature'
                ? `${video.title} - বাংলাদেশের প্রাকৃতিক সৌন্দর্যের একটি অসাধারণ দৃশ্য। এই ভিডিওতে বাংলাদেশের প্রকৃতির মনোমুগ্ধকর দৃশ্যাবলী ধারণ করা হয়েছে।`
                : `${video.title} - বাংলাদেশের শহুরে জীবন এবং স্থাপত্যের একটি চমৎকার প্রদর্শনী। ঢাকা এবং বাংলাদেশের অন্যান্য শহরের জীবনযাত্রা এই ভিডিওতে দেখানো হয়েছে।`
              }
            </p>
          </div>

          {teacher && (
            <div className="video-teacher">
              <h3>শিক্ষক সম্পর্কে</h3>
              <div className="teacher-preview">
                <img src={teacher.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'} alt={teacher.name} />
                <div>
                  <h4>{teacher.name}</h4>
                  <p>{teacher.title}</p>
                  <div className="teacher-rating-small">
                    <span>⭐ {teacher.rating}</span>
                    <span>👥 {teacher.students}+ students</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
