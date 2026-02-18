// Input sanitization helpers to prevent XSS and injection attacks

/**
 * Removes HTML tags and dangerous characters from user input
 * @param {string} input - User input string
 * @returns {string} - Sanitized string
 */
export function sanitizeString(input) {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .trim();
}

/**
 * Sanitizes an object's string fields
 * @param {object} obj - Object to sanitize
 * @param {string[]} fields - Array of field names to sanitize
 * @returns {object} - Object with sanitized fields
 */
export function sanitizeObject(obj, fields) {
  const sanitized = { ...obj };
  
  for (const field of fields) {
    if (sanitized[field] && typeof sanitized[field] === 'string') {
      sanitized[field] = sanitizeString(sanitized[field]);
    }
  }
  
  return sanitized;
}

/**
 * Validates and sanitizes game data before database operations
 * @param {object} gameData - Game data from request
 * @returns {object} - Sanitized game data
 */
export function sanitizeGameData(gameData) {
  const fieldsToSanitize = [
    'title',
    'description',
    'developer',
    'publisher',
    'primary_genre',
    'gameplay_style',
    'content_suitability',
    'difficulty_level',
    'platform_type',
    'embed_url',
    'thumbnail_url'
  ];
  
  const sanitized = sanitizeObject(gameData, fieldsToSanitize);
  
  // Sanitize arrays
  if (Array.isArray(sanitized.genres)) {
    sanitized.genres = sanitized.genres.map(g => sanitizeString(g));
  }
  if (Array.isArray(sanitized.target_skills)) {
    sanitized.target_skills = sanitized.target_skills.map(s => sanitizeString(s));
  }
  if (Array.isArray(sanitized.platform)) {
    sanitized.platform = sanitized.platform.map(p => sanitizeString(p));
  }
  
  // Validate URLs
  if (sanitized.embed_url && !isValidUrl(sanitized.embed_url)) {
    sanitized.embed_url = '';
  }
  if (sanitized.thumbnail_url && !isValidUrl(sanitized.thumbnail_url)) {
    sanitized.thumbnail_url = '';
  }
  
  return sanitized;
}

/**
 * Basic URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
