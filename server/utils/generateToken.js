import jwt from 'jsonwebtoken';
export function generateToken(userId, secret, expiresIn = '7d') {
  return jwt.sign({ sub: userId }, secret, { expiresIn });
}
