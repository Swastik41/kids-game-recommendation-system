import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function Accessibility() {
  const lastUpdated = "February 18, 2026";

  return (
    <main className="page legal-page">
      <div className="container legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Accessibility Statement</h1>
          <p className="legal-meta">Last Updated: {lastUpdated}</p>
          <p className="legal-intro">
            PixiPlay is committed to ensuring digital accessibility for all users, 
            including children with disabilities, their parents, and educators. 
            We strive to meet or exceed Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
          </p>
        </header>

        <div className="legal-content">
          <section className="legal-section">
            <h2>Our Commitment</h2>
            <p>
              We believe every child deserves access to quality educational game recommendations, 
              regardless of ability. Accessibility is not an afterthought—it's integrated into our 
              design and development process from the start.
            </p>
            <p>
              <strong>Our Goals:</strong>
            </p>
            <ul>
              <li>Make PixiPlay usable by people with diverse abilities and assistive technologies</li>
              <li>Provide equal access to information and functionality</li>
              <li>Design with inclusivity and universal design principles</li>
              <li>Continuously improve accessibility through testing and user feedback</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Accessibility Features</h2>
            
            <h3>Keyboard Navigation</h3>
            <ul>
              <li>✓ All interactive elements are keyboard accessible (Tab, Enter, Arrow keys)</li>
              <li>✓ Clear focus indicators for keyboard users</li>
              <li>✓ Logical tab order throughout the site</li>
              <li>✓ Skip navigation links to bypass repetitive content</li>
            </ul>

            <h3>Screen Reader Support</h3>
            <ul>
              <li>✓ Semantic HTML structure (headings, landmarks, lists)</li>
              <li>✓ Descriptive alt text for all informational images</li>
              <li>✓ ARIA labels and roles for dynamic content</li>
              <li>✓ Proper heading hierarchy (H1 → H2 → H3)</li>
              <li>✓ Form labels properly associated with inputs</li>
            </ul>

            <h3>Visual Design</h3>
            <ul>
              <li>✓ High contrast text and backgrounds (WCAG AA compliant)</li>
              <li>✓ Text resizable up to 200% without loss of content or functionality</li>
              <li>✓ Clear, readable fonts (minimum 16px body text)</li>
              <li>✓ Color is not the only means of conveying information</li>
              <li>✓ Sufficient spacing between interactive elements (44x44px minimum touch targets)</li>
            </ul>

            <h3>Content & Language</h3>
            <ul>
              <li>✓ Plain language and clear instructions</li>
              <li>✓ Descriptive link text (no "click here" or "read more" alone)</li>
              <li>✓ Error messages that explain how to fix issues</li>
              <li>✓ Consistent navigation and layout across pages</li>
            </ul>

            <h3>Multimedia</h3>
            <ul>
              <li>✓ No auto-playing audio or video</li>
              <li>✓ Captions and transcripts for video content (when applicable)</li>
              <li>✓ Pause, stop, or hide controls for moving content</li>
            </ul>

            <h3>Forms & Interaction</h3>
            <ul>
              <li>✓ Clear form labels and instructions</li>
              <li>✓ Inline error validation with helpful messages</li>
              <li>✓ Required fields clearly marked</li>
              <li>✓ Form submission confirmation messages</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Assistive Technologies Tested</h2>
            <p>
              We've tested PixiPlay with the following assistive technologies and browsers:
            </p>
            <ul>
              <li><strong>Screen Readers:</strong> NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS), TalkBack (Android)</li>
              <li><strong>Browsers:</strong> Chrome, Firefox, Safari, Edge (latest versions)</li>
              <li><strong>Keyboard Navigation:</strong> Standard keyboard, on-screen keyboards</li>
              <li><strong>Zoom:</strong> Browser zoom up to 200%, screen magnification software</li>
              <li><strong>Voice Control:</strong> Voice recognition software (Dragon NaturallySpeaking)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Known Limitations</h2>
            <p>
              Despite our efforts, some accessibility issues may exist. We're actively working to address:
            </p>
            <ul>
              <li>Some third-party game images may lack descriptive alt text (working with data sources)</li>
              <li>External game links lead to third-party sites that may have varying accessibility standards</li>
              <li>Some complex filter interactions may require additional keyboard shortcuts (in development)</li>
            </ul>
            <p>
              <strong>We are committed to resolving these issues</strong> and welcome your feedback 
              to help us prioritize improvements.
            </p>
          </section>

          <section className="legal-section">
            <h2>Third-Party Content</h2>
            <p>
              PixiPlay links to external game platforms (App Store, Google Play, Steam, etc.). 
              While we cannot control the accessibility of these third-party sites, we:
            </p>
            <ul>
              <li>Provide clear warnings when users are leaving PixiPlay</li>
              <li>Include game accessibility information when available (e.g., subtitles, colorblind modes)</li>
              <li>Encourage users to review game accessibility features before purchasing</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Standards & Compliance</h2>
            <p>PixiPlay aims to conform to the following accessibility standards:</p>
            <ul>
              <li><strong>WCAG 2.1 Level AA:</strong> Web Content Accessibility Guidelines</li>
              <li><strong>Section 508:</strong> U.S. federal accessibility standards</li>
              <li><strong>EN 301 549:</strong> European accessibility standard</li>
              <li><strong>ADA Title III:</strong> Americans with Disabilities Act (web accessibility)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Ongoing Improvements</h2>
            <p>Accessibility is an ongoing process. Our commitment includes:</p>
            <ul>
              <li>Regular accessibility audits using automated tools and manual testing</li>
              <li>User testing with people who use assistive technologies</li>
              <li>Training our team on accessibility best practices</li>
              <li>Addressing reported issues within 30 days (critical issues faster)</li>
              <li>Updating this statement as we make improvements</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Feedback & Support</h2>
            <p>
              We welcome feedback on the accessibility of PixiPlay. If you encounter barriers, 
              have suggestions for improvement, or need assistance accessing content, please contact us:
            </p>
            <ul className="contact-list">
              <li><strong>Email:</strong> <a href="mailto:accessibility@pixiplay.com">accessibility@pixiplay.com</a></li>
              <li><strong>Contact Form:</strong> <Link to="/contact">Submit an Accessibility Report</Link></li>
              <li><strong>Response Time:</strong> We aim to respond within 3 business days</li>
            </ul>
            <p>
              When reporting an issue, please include:
            </p>
            <ul>
              <li>The page or feature you were trying to access</li>
              <li>The assistive technology or browser you're using</li>
              <li>A description of the difficulty you experienced</li>
              <li>Your contact information (if you'd like a response)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Alternative Formats</h2>
            <p>
              If you need content from PixiPlay in an alternative format (large print, audio, etc.), 
              please contact us. We'll work with you to provide the information in a format that meets your needs.
            </p>
          </section>

          <section className="legal-section">
            <h2>Formal Complaints</h2>
            <p>
              We take accessibility concerns seriously. If you're not satisfied with our response 
              to an accessibility issue, you may:
            </p>
            <ul>
              <li>File a formal complaint with our accessibility team at{" "}
                <a href="mailto:accessibility@pixiplay.com">accessibility@pixiplay.com</a>
              </li>
              <li>Contact relevant regulatory authorities in your jurisdiction</li>
              <li>In the U.S.: File a complaint with the Department of Justice (ADA) or the Department of Education (Section 504)</li>
            </ul>
          </section>
        </div>

        <div className="legal-footer">
          <p>
            Accessibility is essential to PixiPlay's mission of providing inclusive 
            educational resources for all families. Thank you for helping us improve.
          </p>
          <div className="legal-actions">
            <Link to="/contact" className="btn btn-primary">
              Report Accessibility Issue
            </Link>
            <Link to="/faq" className="btn btn-outline">
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
