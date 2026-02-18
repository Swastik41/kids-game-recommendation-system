🧩 PixiPlay - Kids Game Exploration System (MERN Stack)

## 📖 Description

**PixiPlay** is a production-ready, security-hardened web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It intelligently recommends fun, educational, and age-appropriate games to children based on comprehensive metadata including category, difficulty, gameplay style, platform type, content rating, and skill development targets.

This platform goes beyond simple keyword searches by implementing **content-based filtering** and **popularity-weighted ranking algorithms** to deliver safe, relevant, and personalized game recommendations. With a curated dataset of 200+ games from Kaggle and trusted sources, PixiPlay serves as a trusted companion for parents, teachers, and kids to discover games that balance entertainment with learning.

### 🎯 What Makes PixiPlay Different

- **Security-First Architecture**: Production-grade security with rate limiting, authentication, input sanitization, and OWASP best practices
- **Industry-Standard Compliance**: Includes Privacy Policy, Terms of Service, COPPA compliance, and WCAG 2.1 accessibility guidelines
- **Role-Based Access Control**: Separate interfaces for Parents, Teachers, and Administrators with JWT authentication
- **Storybook Playground Theme**: Kid-friendly, colorful UI designed to engage young users while maintaining professional standards
- **Real-Time Game Management**: Admin dashboard with full CRUD operations for maintaining the game library
- **Community Support**: Integrated PayPal donation system to support platform sustainability

## ⚙️ Key Features

### 🎮 Core Functionality
- **Smart Game Recommendations** – Multi-factor filtering by genre, platform, content rating, difficulty, and user reviews
- **Advanced Search & Sort** – Real-time search with popularity, rating, reviews, and recency-based sorting
- **Pagination & Load More** – Efficient data loading with 15 games per page for optimal performance
- **Interactive Game Previews** – Embedded game thumbnails with detailed modal views
- **Cross-Platform Coverage** – Mobile games, console/PC titles, and web-based games in one platform

### 🔐 Security & Authentication
- **JWT-Based Authentication** – HTTP-only cookies with bcrypt password hashing (12 rounds)
- **Role-Based Authorization** – Parent, Teacher, and Admin roles with protected routes
- **Custom Rate Limiting** – 5 auth requests, 100 API requests, 50 admin requests per 15 minutes
- **Input Sanitization** – XSS protection with HTML/script tag removal and URL validation
- **Security Headers** – Helmet integration with CSP, X-Frame-Options, X-Content-Type-Options
- **Password Policy** – Enforced 8+ character passwords with uppercase, lowercase, and number requirements
- **ReDoS Prevention** – Input length validation to prevent Regular Expression Denial of Service attacks

### 👨‍💼 Admin Dashboard
- **Full CRUD Operations** – Create, Read, Update, Delete games with real-time database sync
- **Search & Filter Games** – Admin-specific interface to manage 200+ game library
- **Game Statistics** – View total games, average ratings, unique genres, and platform distribution
- **Form Validation** – Client and server-side validation for data integrity
- **Admin-Only Access** – Protected routes requiring both authentication and Admin role verification

### 🎨 User Experience
- **Storybook Playground Theme** – Vibrant, kid-friendly design with playful colors and animations
- **Responsive Design** – Mobile-first approach with breakpoints for tablets and desktops
- **Password Strength Indicator** – Real-time validation with visual checkmarks during signup
- **Accessibility Compliant** – WCAG 2.1 Level AA standards with keyboard navigation support
- **Industry-Standard Footer** – 4-column layout with Explore, Support, Legal, and Community sections

### 📄 Legal & Compliance
- **Privacy Policy** – Comprehensive COPPA compliance and data protection guidelines
- **Terms of Service** – User agreements, liability disclaimers, and acceptable use policies
- **FAQ Page** – 20+ frequently asked questions with interactive accordion UI
- **Contact Form** – Multi-category support requests with input validation
- **Accessibility Statement** – Commitment to inclusive design and adaptive technologies

### 💰 Community Features
- **PayPal Integration** – Secure donation system with @paypal/react-paypal-js SDK
- **Custom Donation Amounts** – Support platform with one-time contributions
- **Transparent Funding** – Clear messaging on how donations support game curation and platform maintenance

## 🧠 Tech Stack

### Frontend
- **React** 19.2.0 - Modern UI library with hooks and context API
- **React Router** 7.9.4 - Client-side routing with protected routes
- **Axios** 1.7.9 - HTTP client for API requests
- **PayPal React SDK** 8.1.3 - Payment integration
- **HTML5 & CSS3** - Semantic markup and responsive styling
- **ES6+ JavaScript** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** 5.1.0 - Web application framework
- **MongoDB** - NoSQL database for game and user data
- **Mongoose** 8.19.3 - MongoDB object modeling

### Security & Authentication
- **bcrypt** 6.0.0 - Password hashing with 12-round salting
- **jsonwebtoken** 9.0.2 - JWT token generation and verification
- **helmet** 8.1.0 - Security headers middleware
- **cookie-parser** 1.4.7 - HTTP-only cookie handling
- **Custom Rate Limiter** - In-memory request throttling
- **Input Sanitization Utils** - XSS protection and URL validation

### Additional Packages
- **cors** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.6.1 - Environment variable management
- **morgan** 1.10.1 - HTTP request logging
- **nodemon** 3.1.10 - Development auto-restart

### Development & Testing
- **Jest** - Unit and integration testing
- **Mocha** - Asynchronous testing framework
- **Postman** - API endpoint testing and documentation
- **ESLint** - Code quality and consistency

### DevOps & Collaboration
- **Git & GitHub** - Version control and code collaboration
- **Jenkins** - CI/CD pipeline automation
- **Trello** - Agile project management and sprint planning
- **Microsoft Teams** - Team communication and meetings

### Deployment
- **Vercel / Render / AWS** - Cloud hosting platforms
- **MongoDB Atlas** - Cloud database hosting

## 🔒 Security Audit & Compliance

PixiPlay underwent a comprehensive security audit documenting and remediating **7 vulnerabilities** across CRITICAL to LOW severity levels. See [SECURITY_AUDIT.md](SECURITY_AUDIT.md) for the complete report.

### Vulnerabilities Fixed

**CRITICAL (2)**
- ✅ Unauthenticated Admin Routes - All CRUD operations now require JWT authentication + Admin role verification
- ✅ ReDoS (Regular Expression Denial of Service) - Input length limits (50-100 chars) prevent regex-based attacks

**HIGH (2)**
- ✅ Missing Rate Limiting - Custom middleware limits auth (5/15min), API (100/15min), and admin (50/15min) requests per IP
- ✅ No Security Headers - Helmet middleware adds CSP, X-Frame-Options, X-Content-Type-Options, HSTS

**MEDIUM (2)**
- ✅ Weak Password Policy - Now enforces 8+ characters with uppercase, lowercase, and number requirements
- ✅ User Enumeration - Generic error messages prevent account discovery through registration/login

**LOW (1)**
- ✅ XSS Vulnerabilities - Custom sanitization removes HTML tags, scripts, event handlers, and validates URLs

### Security Best Practices Implemented
- HTTP-only cookies for JWT storage (prevents XSS token theft)
- CORS configuration with whitelisted origins
- MongoDB connection string in environment variables
- Error handling without exposing stack traces
- Input validation on both client and server
- HTTPS-ready configuration for production

## 🌍 Market Relevance

With the global gaming industry surpassing $300 billion and EdTech gamification growing rapidly, this project represents a real-world application of full-stack development, data engineering, and DevOps — aligning perfectly with the skills sought in Full-Stack Developer, Web Application Engineer, and DevOps Developer roles.

## 👨‍💻 Team Members

- **Swastik Pathak** – Project Lead / Full Stack Developer
- **Vrutik Patel** – Front-End Developer
- **Kaushikkumar Gadat** – Back-End Developer
- **Yash Lande** – Database & QA Lead

## 🏆 Project Highlights

### Technical Excellence
- ✅ **Production-Ready Architecture** - MERN stack with Express 5.x and React 19.x
- ✅ **Security-Hardened Backend** - 7 vulnerabilities identified and resolved with comprehensive audit documentation
- ✅ **Role-Based Access Control** - JWT authentication with Parent, Teacher, and Admin roles
- ✅ **Scalable Database Design** - Mongoose schemas with indexes for optimized queries (200+ games)
- ✅ **Custom Middleware** - Rate limiting and input sanitization utilities built from scratch

### User Experience
- ✅ **Storybook Playground Theme** - Kid-friendly design system with vibrant colors and playful animations
- ✅ **Industry-Standard Footer** - 4-column layout with legal, support, and community sections
- ✅ **5 Legal/Compliance Pages** - Privacy Policy, Terms of Service, FAQ, Contact, Accessibility
- ✅ **Real-Time Validation** - Password strength indicator with visual feedback during signup
- ✅ **Responsive Design** - Mobile-first approach with tablet and desktop breakpoints

### Business Logic
- ✅ **Content-Based Filtering** - Multi-factor recommendation algorithm using genre, platform, rating, difficulty
- ✅ **Popularity-Weighted Ranking** - Combines user ratings, review counts, and meta scores
- ✅ **Advanced Search** - Real-time filtering with sorting by popularity, rating, reviews, and recency
- ✅ **Pagination System** - Efficient data loading with "Load More" functionality for 200+ games
- ✅ **Admin Dashboard** - Full CRUD operations with search, statistics, and batch management

### DevOps & Collaboration
- ✅ **Agile Methodology** - Sprint planning, Trello boards, and Microsoft Teams collaboration
- ✅ **CI/CD Integration** - Jenkins pipeline for automated testing and deployment
- ✅ **Comprehensive Testing** - Jest unit tests, Mocha integration tests, Postman API collections
- ✅ **Version Control** - Git branching strategy with meaningful commit messages
- ✅ **Documentation** - README, Security Audit, API documentation, and code comments

### Market Readiness
- ✅ **COPPA Compliance** - Children's Online Privacy Protection Act guidelines implemented
- ✅ **WCAG 2.1 Accessibility** - Level AA compliance with keyboard navigation and screen reader support
- ✅ **PayPal Integration** - Secure donation system for community sustainability
- ✅ **Error Handling** - User-friendly error messages without exposing sensitive information
- ✅ **HTTPS-Ready** - Configured for production deployment with security best practices

## 📊 Project Statistics

- **Total Games**: 200+ curated from Kaggle and trusted sources
- **Code Lines**: 5,000+ across frontend and backend
- **Security Fixes**: 7 vulnerabilities patched (2 CRITICAL, 2 HIGH, 2 MEDIUM, 1 LOW)
- **Pages Created**: 12+ including Home, Exploration, Admin Dashboard, About, Donation, and 5 legal pages
- **API Endpoints**: 15+ including authentication, game CRUD, recommendations, and health checks
- **Test Coverage**: Unit, integration, and end-to-end testing with Jest, Mocha, and Postman

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git
- PayPal Developer Account (for donation feature)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kids-game-recommendation-system.git
   cd kids-game-recommendation-system
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Seed the Database (Optional)**
   ```bash
   node scripts/seedGames.js
   ```

5. **Start the Backend Server**
   ```bash
   npm run dev
   ```

6. **Set up the Frontend**
   
   Open a new terminal:
   ```bash
   cd client
   npm install
   ```

7. **Configure Frontend Environment**
   
   Create a `.env` file in the `client` directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

8. **Start the Frontend**
   ```bash
   npm start
   ```

9. **Access the Application**
   
   Open your browser and navigate to:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - API Health Check: `http://localhost:5000/api/health`

### Default Admin Credentials

For testing purposes, you can create an admin account through the signup page and manually update the role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@pixiplay.com" },
  { $set: { role: "Admin" } }
)
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Game Endpoints
- `GET /api/games/home` - Get featured games for homepage
- `GET /api/games/recommendations` - Get filtered game recommendations
- `GET /api/games` - Get all games (Admin only)
- `GET /api/games/:id` - Get single game (Admin only)
- `POST /api/games` - Create new game (Admin only)
- `PUT /api/games/:id` - Update game (Admin only)
- `DELETE /api/games/:id` - Delete game (Admin only)

## 🧪 Testing

### Run Backend Tests
```bash
cd server
npm test
```

### Run Frontend Tests
```bash
cd client
npm test
```

### API Testing with Postman
Import the Postman collection from `/documents/postman-collection.json`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

For questions or support, please visit the [Contact Page](http://localhost:3000/contact) or reach out to the team members above.

## 🙏 Acknowledgments

- Kaggle for the initial game dataset
- MERN Stack community for excellent documentation
- Storybook Playground theme inspiration
- Our academic advisors and mentors
- All contributors and testers who helped improve PixiPlay

---

**Built with ❤️ by the PixiPlay Team | Making screen time meaningful for kids worldwide**
