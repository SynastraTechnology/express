import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const IV = process.env.IV;

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(
    'aes-128-cbc',
    Buffer.from(SECRET_KEY!, 'utf8'),
    Buffer.from(IV!, 'utf8')
  );
  cipher.setAutoPadding(true);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted.toUpperCase();
};

export const decrypt = (encrypted: string): string => {
  const decipher = crypto.createDecipheriv(
    'aes-128-cbc',
    Buffer.from(SECRET_KEY!, 'utf8'),
    Buffer.from(IV!, 'utf8')
  );
  decipher.setAutoPadding(true);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
