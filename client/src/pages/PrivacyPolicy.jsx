import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function PrivacyPolicy() {
  const lastUpdated = "February 18, 2026";

  return (
    <main className="page legal-page">
      <div className="container legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">Last Updated: {lastUpdated}</p>
          <p className="legal-intro">
            At PixiPlay, protecting the privacy of children and families is our highest priority. 
            This Privacy Policy explains what information we collect, how we use it, and your rights.
          </p>
        </header>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Information We Collect</h2>
            <p>
              PixiPlay is designed to minimize data collection. We only collect information 
              necessary to provide game recommendations and improve our service.
            </p>
            
            <h3>1.1 Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> If you create an account, we collect your email address and a password (encrypted).</li>
              <li><strong>Preference Data:</strong> Age range, preferred game categories, platform choices, and filter settings you select.</li>
              <li><strong>Donation Information:</strong> If you support PixiPlay through donations, payment processing is handled securely by PayPal. We do not store credit card information.</li>
            </ul>

            <h3>1.2 Automatically Collected Information</h3>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, games viewed, filters used, and time spent on the platform.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, IP address (anonymized), and screen resolution.</li>
              <li><strong>Cookies:</strong> We use essential cookies for authentication and preference storage. No third-party tracking cookies are used.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Provide personalized game recommendations based on your filters and preferences</li>
              <li>Maintain and secure your account</li>
              <li>Improve our recommendation algorithm and user experience</li>
              <li>Send important service updates (only if you opt-in to communications)</li>
              <li>Comply with legal obligations and protect user safety</li>
            </ul>
            <p className="highlight-box">
              <strong>🔒 We never sell or rent your personal information to third parties.</strong>
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Children's Privacy (COPPA Compliance)</h2>
            <p>
              PixiPlay is designed for children ages 6-12 with parental guidance. We comply 
              with the Children's Online Privacy Protection Act (COPPA):
            </p>
            <ul>
              <li>We do not knowingly collect personal information directly from children under 13 without verifiable parental consent</li>
              <li>Parents and teachers control account creation and settings</li>
              <li>No behavioral advertising or third-party tracking</li>
              <li>No social media integration that exposes children's data</li>
              <li>Parents can review, delete, or request their child's data at any time</li>
            </ul>
            <p>
              If you believe we have inadvertently collected information from a child under 13 
              without consent, please contact us immediately at{" "}
              <a href="mailto:privacy@pixiplay.com">privacy@pixiplay.com</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Data Sharing and Third Parties</h2>
            <p>We only share data with:</p>
            <ul>
              <li><strong>Payment Processors:</strong> PayPal for secure donation processing (they have their own privacy policies)</li>
              <li><strong>Hosting Services:</strong> Our web hosting provider to maintain the platform securely</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect user safety</li>
            </ul>
            <p>
              <strong>We do not share data with:</strong> Advertisers, data brokers, social media platforms, 
              or any other third parties for marketing purposes.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures:</p>
            <ul>
              <li>Encrypted connections (HTTPS/SSL) for all data transmission</li>
              <li>Secure password hashing (bcrypt)</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to personal data</li>
              <li>Secure database backups</li>
            </ul>
            <p>
              While we take security seriously, no method of transmission over the internet is 100% secure. 
              We encourage strong passwords and safe browsing practices.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data (subject to legal retention requirements)</li>
              <li><strong>Opt-Out:</strong> Decline optional communications at any time</li>
              <li><strong>Data Portability:</strong> Receive your data in a common format</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@pixiplay.com">privacy@pixiplay.com</a> or visit our{" "}
              <Link to="/contact">Contact Page</Link>.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Cookies and Tracking</h2>
            <p>PixiPlay uses minimal cookies:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> For login sessions and security (required)</li>
              <li><strong>Preference Cookies:</strong> To remember your filter settings (optional)</li>
            </ul>
            <p>
              You can disable cookies in your browser settings, but this may limit functionality. 
              We do not use third-party analytics, advertising cookies, or tracking pixels.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Data Retention</h2>
            <p>We retain your data only as long as necessary:</p>
            <ul>
              <li><strong>Active Accounts:</strong> Data retained while account is active</li>
              <li><strong>Deleted Accounts:</strong> Personal data removed within 30 days</li>
              <li><strong>Legal Requirements:</strong> Some data may be retained longer for compliance (e.g., donation records for tax purposes)</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>9. International Users</h2>
            <p>
              PixiPlay is operated from [Your Country]. If you access our service from outside 
              this region, your data may be transferred to and stored in [Your Country]. 
              By using PixiPlay, you consent to this transfer. We comply with applicable 
              international data protection regulations.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Significant changes will be announced 
              on our homepage and via email (if you've opted in). Continued use of PixiPlay after 
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact Us</h2>
            <p>For privacy-related questions or concerns, contact us:</p>
            <ul className="contact-list">
              <li><strong>Email:</strong> <a href="mailto:privacy@pixiplay.com">privacy@pixiplay.com</a></li>
              <li><strong>Contact Form:</strong> <Link to="/contact">Submit an Inquiry</Link></li>
              <li><strong>Response Time:</strong> We aim to respond within 7 business days</li>
            </ul>
          </section>
        </div>

        <div className="legal-footer">
          <p>
            This Privacy Policy is part of our{" "}
            <Link to="/terms">Terms of Service</Link>. 
            By using PixiPlay, you agree to both documents.
          </p>
          <div className="legal-actions">
            <Link to="/terms" className="btn btn-outline">
              Read Terms of Service
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
