import React, { useState } from 'react'
import './Contact.css'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="contact-container">
            <div className="contact-hero">
                <h1>যোগাযোগ করুন</h1>
                <p>আপনার যেকোনো প্রশ্ন বা পরামর্শের জন্য আমরা আছি পাশে</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-icon">📍</div>
                        <h3>ঠিকানা</h3>
                        <p>লেভেল ৫, শেখ হাসিনা সফটওয়্যার টেকনোলজি পার্ক<br />কারওয়ান বাজার, ঢাকা-১২১৫</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">📞</div>
                        <h3>ফোন</h3>
                        <p>+৮৮০ ১৭১২-৩৪৫৬৭৮<br />+৮৮০ ১৬১২-৩৪৫৬৭৮</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">✉️</div>
                        <h3>ইমেইল</h3>
                        <p>support@sheba.bd<br />info@sheba.bd</p>
                    </div>
                </div>

                <div className="contact-form-section">
                    {submitted ? (
                        <div className="success-message">
                            <div className="success-icon">✓</div>
                            <h3>ধন্যবাদ!</h3>
                            <p>আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                            <button
                                className="reset-btn"
                                onClick={() => setSubmitted(false)}
                            >
                                অন্য বার্তা পাঠান
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <h2>বার্তা পাঠান</h2>

                            <div className="form-group">
                                <label>আপনার নাম</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="আপনার পূর্ণ নাম লিখুন"
                                />
                            </div>

                            <div className="form-group">
                                <label>ইমেইল</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div className="form-group">
                                <label>বিষয়</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="কোন বিষয়ে যোগাযোগ করতে চান?"
                                />
                            </div>

                            <div className="form-group">
                                <label>বার্তা</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="বিস্তারিত লিখুন..."
                                    rows={5}
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                বার্তা পাঠান
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Contact
