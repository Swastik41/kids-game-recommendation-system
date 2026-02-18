import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user types
    if (status.message) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (replace with actual API call)
    try {
      // TODO: Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent. We'll respond within 2-3 business days."
      });
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: ""
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again or email us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page contact-page">
      <div className="container contact-container">
        <header className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-intro">
            Have questions, suggestions, or need support? We'd love to hear from you! 
            Fill out the form below or reach us through the contact methods listed.
          </p>
        </header>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    Your Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Inquiry Type</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category (optional)</option>
                  <option value="general">General Question</option>
                  <option value="support">Technical Support</option>
                  <option value="suggestion">Game Suggestion</option>
                  <option value="privacy">Privacy Concern</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your question or feedback..."
                  rows="6"
                  required
                ></textarea>
              </div>

              {status.message && (
                <div className={`form-status form-status--${status.type}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="form-note">
                By submitting this form, you agree to our{" "}
                <Link to="/privacy">Privacy Policy</Link>.
                We typically respond within 2-3 business days.
              </p>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="contact-info-section">
            <div className="contact-card">
              <h3>📧 Email Us</h3>
              <p>For general inquiries:</p>
              <a href="mailto:hello@pixiplay.com" className="contact-link">
                hello@pixiplay.com
              </a>
              
              <hr className="contact-divider" />
              
              <p>For privacy concerns:</p>
              <a href="mailto:privacy@pixiplay.com" className="contact-link">
                privacy@pixiplay.com
              </a>
              
              <hr className="contact-divider" />
              
              <p>For technical support:</p>
              <a href="mailto:support@pixiplay.com" className="contact-link">
                support@pixiplay.com
              </a>
            </div>

            <div className="contact-card">
              <h3>📚 Quick Resources</h3>
              <ul className="contact-links-list">
                <li>
                  <Link to="/faq">Help Center & FAQ</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/accessibility">Accessibility Statement</Link>
                </li>
              </ul>
            </div>

            <div className="contact-card">
              <h3>⏱️ Response Time</h3>
              <p>
                We aim to respond to all inquiries within <strong>2-3 business days</strong>. 
                For urgent technical issues, please include detailed information about your 
                device, browser, and the problem you're experiencing.
              </p>
            </div>

            <div className="contact-card">
              <h3>🌐 Follow Us</h3>
              <p>
                Stay updated with the latest game recommendations, platform updates, 
                and educational resources.
              </p>
              <div className="contact-social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  Facebook
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  Twitter
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
