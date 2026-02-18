import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is PixiPlay?",
          a: "PixiPlay is a free educational platform that helps families, teachers, and kids discover safe, age-appropriate, and educational games. We curate games from various platforms and provide detailed information to help you make informed choices about screen time."
        },
        {
          q: "Do I need to create an account?",
          a: "No! You can browse and filter games without an account. However, creating an account allows you to save preferences, track favorite games, and receive personalized recommendations."
        },
        {
          q: "Is PixiPlay really free?",
          a: "Yes, PixiPlay is completely free to use. We're an educational project designed to help families and educators. Donations are welcome but never required."
        },
        {
          q: "What age range is PixiPlay designed for?",
          a: "PixiPlay focuses on games for children ages 6-12, but our library includes content suitable for younger and older kids as well. Use our age filters to find appropriate games for your child."
        }
      ]
    },
    {
      category: "Safety & Privacy",
      questions: [
        {
          q: "How do you ensure games are safe for children?",
          a: "We curate games based on official content ratings (ESRB, PEGI, App Store ratings), user reviews, and educational value. However, we encourage parents to review game details and supervise their children's gaming activities."
        },
        {
          q: "Do you collect personal information from children?",
          a: "We comply with COPPA (Children's Online Privacy Protection Act). We do not knowingly collect personal information from children under 13 without verifiable parental consent. See our Privacy Policy for details."
        },
        {
          q: "Are there ads on PixiPlay?",
          a: "No. PixiPlay is completely ad-free. We do not display third-party advertisements or use tracking pixels. Your browsing experience is safe and distraction-free."
        },
        {
          q: "Do you sell user data?",
          a: "Never. We do not sell, rent, or share your personal information with third parties for marketing purposes. Read our Privacy Policy for full details on data handling."
        }
      ]
    },
    {
      category: "Using PixiPlay",
      questions: [
        {
          q: "How do I find games for my child?",
          a: "Use our advanced filters on the Game Exploration page. You can filter by age (content rating), genre, platform (mobile or video game), minimum rating, and more. You can also use the search bar to find specific games."
        },
        {
          q: "What do the difficulty badges mean?",
          a: "Difficulty badges indicate how challenging a game is: Easy (suitable for beginners), Medium (requires some skill), Challenging (for experienced players), and Hard (advanced gameplay). This helps match games to your child's skill level."
        },
        {
          q: "Can I download games directly from PixiPlay?",
          a: "No. PixiPlay is a recommendation service, not a game distributor. When you click on a game, we provide links to official sources (App Store, Google Play, Steam, etc.) where you can download or purchase the game."
        },
        {
          q: "How often is the game library updated?",
          a: "We regularly add new games and update information to keep our recommendations current. Check back frequently to discover new titles!"
        }
      ]
    },
    {
      category: "For Parents & Teachers",
      questions: [
        {
          q: "How can I use PixiPlay in the classroom?",
          a: "Teachers can use PixiPlay to find educational games that reinforce classroom concepts (math, reading, logic, creativity). Use filters to find games suitable for early finishers, learning stations, or group activities."
        },
        {
          q: "Can I set screen time limits through PixiPlay?",
          a: "PixiPlay does not enforce screen time limits—that's controlled through your device's parental controls. However, we do provide information on game length and session duration to help you plan balanced screen time."
        },
        {
          q: "Are games on PixiPlay educational?",
          a: "Many games in our library have educational value (problem-solving, creativity, math, reading), but not all. We include both learning-focused games and purely fun titles. Use our category filters to find games that match your goals."
        },
        {
          q: "Can I suggest games to be added to PixiPlay?",
          a: "Yes! We welcome suggestions. Visit our Contact page to recommend games you think would be a great fit for our community."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "I forgot my password. How do I reset it?",
          a: "On the login page, click 'Forgot Password?' and enter your email address. We'll send you a link to reset your password. If you don't receive the email, check your spam folder or contact us for help."
        },
        {
          q: "The website isn't loading properly. What should I do?",
          a: "Try these steps: (1) Refresh the page, (2) Clear your browser cache and cookies, (3) Try a different browser (we support Chrome, Firefox, Safari, Edge), (4) Check your internet connection. If problems persist, contact us with details about your browser and device."
        },
        {
          q: "Can I use PixiPlay on mobile devices?",
          a: "Yes! PixiPlay is fully responsive and works on smartphones, tablets, and desktop computers. For the best experience, we recommend using an updated browser."
        },
        {
          q: "How do I delete my account?",
          a: "Log in to your account, go to Account Settings, and click 'Delete Account.' Your data will be permanently removed within 30 days. You can also contact us to request account deletion."
        }
      ]
    },
    {
      category: "Donations & Support",
      questions: [
        {
          q: "How do donations help PixiPlay?",
          a: "Donations help us maintain the platform, expand our game library, improve recommendations, and keep PixiPlay ad-free. Every contribution supports our mission to provide quality game recommendations for families."
        },
        {
          q: "Are donations tax-deductible?",
          a: "Donations are not currently tax-deductible unless PixiPlay becomes a registered nonprofit organization. Donation information will be updated if our status changes."
        },
        {
          q: "How do I cancel a recurring donation?",
          a: "If you set up recurring donations through PayPal, you can cancel them directly through your PayPal account settings. If you need assistance, contact us."
        }
      ]
    }
  ];

  return (
    <main className="page faq-page">
      <div className="container faq-container">
        <header className="faq-header">
          <h1 className="faq-title">Help Center & FAQ</h1>
          <p className="faq-intro">
            Quick answers to common questions about PixiPlay. Can't find what you're looking for? 
            Visit our <Link to="/contact">Contact Page</Link> for personalized support.
          </p>
        </header>

        <div className="faq-categories">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="faq-category">
              <h2 className="faq-category-title">{category.category}</h2>
              <div className="faq-list">
                {category.questions.map((faq, qIndex) => {
                  const uniqueIndex = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === uniqueIndex;
                  
                  return (
                    <div key={uniqueIndex} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                      <button
                        className="faq-question"
                        onClick={() => toggleFAQ(uniqueIndex)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-question-text">{faq.q}</span>
                        <span className="faq-toggle-icon" aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="faq-answer">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-help-box">
          <h2>Still need help?</h2>
          <p>
            If you couldn't find the answer to your question, we're here to help! 
            Our support team typically responds within 2-3 business days.
          </p>
          <div className="faq-help-actions">
            <Link to="/contact" className="btn btn-primary">
              Contact Support
            </Link>
            <Link to="/privacy" className="btn btn-outline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="btn btn-outline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
