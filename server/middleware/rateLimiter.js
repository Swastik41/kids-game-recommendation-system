// Simple in-memory rate limiter
// For production, use redis-based rate limiting (e.g., express-rate-limit with redis store)

const rateLimitStore = new Map();

// Clean up old entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.resetTime > 0) {
      rateLimitStore.delete(key);
    }
  }
}, 15 * 60 * 1000);

/**
 * Rate limiter middleware
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @param {string} message - Error message when limit exceeded
 */
export function createRateLimiter(maxRequests = 100, windowMs = 15 * 60 * 1000, message = 'Too many requests') {
  return (req, res, next) => {
    const identifier = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    
    let clientData = rateLimitStore.get(identifier);
    
    if (!clientData || now > clientData.resetTime) {
      // Create new entry or reset
      clientData = {
        count: 1,
        resetTime: now + windowMs
      };
      rateLimitStore.set(identifier, clientData);
      return next();
    }
    
    if (clientData.count >= maxRequests) {
      const retryAfter = Math.ceil((clientData.resetTime - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({ 
        message,
        retryAfter: `${retryAfter} seconds`
      });
    }
    
    clientData.count++;
    next();
  };
}

// Predefined rate limiters for different endpoints
export const authLimiter = createRateLimiter(5, 15 * 60 * 1000, 'Too many authentication attempts. Please try again later.');
export const apiLimiter = createRateLimiter(100, 15 * 60 * 1000, 'Too many requests. Please slow down.');
export const adminLimiter = createRateLimiter(50, 15 * 60 * 1000, 'Too many admin requests. Please try again later.');
