import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function TermsOfService() {
  const lastUpdated = "February 18, 2026";

  return (
    <main className="page legal-page">
      <div className="container legal-container">
        <header className="legal-header">
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-meta">Last Updated: {lastUpdated}</p>
          <p className="legal-intro">
            Welcome to PixiPlay! By using our platform, you agree to these Terms of Service. 
            Please read them carefully before using our game recommendation service.
          </p>
        </header>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using PixiPlay ("the Service"), you agree to be bound by these 
              Terms of Service ("Terms") and our <Link to="/privacy">Privacy Policy</Link>. 
              If you do not agree to these Terms, please do not use the Service.
            </p>
            <p>
              <strong>For Users Under 18:</strong> If you are under 18 years old, you must 
              have permission from a parent or legal guardian to use PixiPlay. Parents and 
              guardians are responsible for their children's use of the Service.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              PixiPlay is a free educational platform that helps families, teachers, and 
              children discover age-appropriate, safe, and educational games. We provide:
            </p>
            <ul>
              <li>Curated game recommendations based on age, category, platform, and user preferences</li>
              <li>Filtering and search tools to find suitable games</li>
              <li>Game information including ratings, reviews, difficulty levels, and content descriptors</li>
              <li>Links to external game sources (app stores, websites)</li>
            </ul>
            <p className="highlight-box">
              <strong>Important:</strong> PixiPlay is a recommendation service only. 
              We do not host, distribute, or sell games. All game downloads and purchases 
              occur through third-party platforms (e.g., Apple App Store, Google Play, Steam).
            </p>
          </section>

          <section className="legal-section">
            <h2>3. User Accounts</h2>
            <h3>3.1 Account Creation</h3>
            <ul>
              <li>Accounts are optional; you can browse most content without registering</li>
              <li>You must provide accurate, current information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your password</li>
              <li>You must notify us immediately of any unauthorized account access</li>
            </ul>

            <h3>3.2 Account Types</h3>
            <ul>
              <li><strong>Parent/Guardian Accounts:</strong> Full access to all features and settings</li>
              <li><strong>Teacher Accounts:</strong> Same as parent accounts, for classroom use</li>
              <li><strong>Child Accounts:</strong> Supervised accounts with limited features (if implemented)</li>
            </ul>

            <h3>3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms, 
              engage in abusive behavior, or pose security risks. You may delete your account 
              at any time through account settings or by contacting us.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. User Conduct</h2>
            <p>When using PixiPlay, you agree to:</p>
            <ul>
              <li>✓ Use the Service for lawful, educational, and family-friendly purposes</li>
              <li>✓ Respect the intellectual property rights of PixiPlay and game developers</li>
              <li>✓ Provide honest feedback and ratings</li>
              <li>✓ Supervise children's use of the platform (for parents/guardians)</li>
            </ul>

            <p>You agree <strong>NOT</strong> to:</p>
            <ul>
              <li>✗ Attempt to hack, disrupt, or compromise the Service's security</li>
              <li>✗ Use automated tools (bots, scrapers) to collect data without permission</li>
              <li>✗ Share accounts or use another user's account without permission</li>
              <li>✗ Post inappropriate, offensive, or harmful content</li>
              <li>✗ Misrepresent your age or identity</li>
              <li>✗ Use the Service for commercial purposes without authorization</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Game Content and Third-Party Links</h2>
            <h3>5.1 Content Accuracy</h3>
            <p>
              We strive to provide accurate, up-to-date game information, but we cannot guarantee 
              the completeness or accuracy of all data. Game ratings, reviews, and content 
              descriptors are sourced from third parties (app stores, publishers, community reviews).
            </p>

            <h3>5.2 External Links</h3>
            <p>
              PixiPlay contains links to external websites and app stores. We are not responsible 
              for the content, privacy practices, or availability of third-party sites. When you 
              leave PixiPlay, you are subject to the terms and policies of those sites.
            </p>

            <h3>5.3 Parental Responsibility</h3>
            <p>
              While we curate age-appropriate content, <strong>parents and guardians are ultimately 
              responsible</strong> for monitoring their children's game choices and screen time. 
              We recommend reviewing game details and ratings before allowing children to download or play.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Intellectual Property</h2>
            <h3>6.1 PixiPlay Ownership</h3>
            <p>
              All content on PixiPlay (design, code, text, logos, graphics, recommendation algorithms) 
              is owned by PixiPlay or its licensors and protected by copyright, trademark, and other 
              intellectual property laws.
            </p>

            <h3>6.2 Limited License</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to use PixiPlay 
              for personal, non-commercial purposes. You may not reproduce, distribute, modify, 
              or create derivative works without written permission.
            </p>

            <h3>6.3 Game Content</h3>
            <p>
              Game titles, images, descriptions, and trademarks belong to their respective developers 
              and publishers. PixiPlay displays this content under fair use for informational and 
              educational purposes.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Disclaimers and Limitations of Liability</h2>
            <h3>7.1 Service "As Is"</h3>
            <p>
              PixiPlay is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, 
              express or implied, including but not limited to:
            </p>
            <ul>
              <li>No guarantee of uninterrupted or error-free service</li>
              <li>No warranty of accuracy, reliability, or completeness of content</li>
              <li>No guarantee that games recommended will meet your expectations</li>
            </ul>

            <h3>7.2 Limitation of Liability</h3>
            <p>
              To the fullest extent permitted by law, PixiPlay and its team shall not be liable for:
            </p>
            <ul>
              <li>Any damages arising from your use or inability to use the Service</li>
              <li>Content or conduct of third-party games or websites</li>
              <li>Unauthorized access to your account or data</li>
              <li>Errors, bugs, or service interruptions</li>
            </ul>
            <p>
              <strong>Maximum Liability:</strong> In any case, our total liability shall not exceed 
              the amount you paid to PixiPlay (if any) in the 12 months prior to the claim.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless PixiPlay, its team, and affiliates from any 
              claims, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul>
              <li>Your violation of these Terms</li>
              <li>Your use of the Service</li>
              <li>Your violation of any rights of another person or entity</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>9. Donations and Support</h2>
            <p>
              PixiPlay is a free, educational project. Donations are voluntary and help us maintain 
              and improve the platform. Donations:
            </p>
            <ul>
              <li>Are processed securely through PayPal</li>
              <li>Are non-refundable except as required by law</li>
              <li>Do not grant special features, premium access, or voting rights</li>
              <li>Are not tax-deductible unless PixiPlay is a registered nonprofit</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>10. Changes to Terms</h2>
            <p>
              We may update these Terms periodically to reflect changes in our Service, legal requirements, 
              or best practices. Significant changes will be announced on our homepage and via email 
              (if you've opted in).
            </p>
            <p>
              <strong>Continued use of PixiPlay after changes</strong> constitutes acceptance of the 
              updated Terms. If you disagree with changes, please stop using the Service and delete 
              your account.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws of [Your Country/State] without regard to conflict 
              of law principles. Any disputes shall be resolved through:
            </p>
            <ul>
              <li><strong>Informal Resolution:</strong> Contact us first to resolve issues amicably</li>
              <li><strong>Arbitration:</strong> If informal resolution fails, disputes may be subject to binding arbitration</li>
              <li><strong>Small Claims Court:</strong> You may bring claims in small claims court if eligible</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>12. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining 
              provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Contact Information</h2>
            <p>For questions about these Terms, contact us:</p>
            <ul className="contact-list">
              <li><strong>Email:</strong> <a href="mailto:legal@pixiplay.com">legal@pixiplay.com</a></li>
              <li><strong>Contact Form:</strong> <Link to="/contact">Submit an Inquiry</Link></li>
              <li><strong>Response Time:</strong> We aim to respond within 7 business days</li>
            </ul>
          </section>
        </div>

        <div className="legal-footer">
          <p>
            These Terms work alongside our{" "}
            <Link to="/privacy">Privacy Policy</Link> and{" "}
            <Link to="/accessibility">Accessibility Statement</Link>. 
            Together, they govern your use of PixiPlay.
          </p>
          <div className="legal-actions">
            <Link to="/privacy" className="btn btn-outline">
              Read Privacy Policy
            </Link>
            <Link to="/faq" className="btn btn-primary">
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
