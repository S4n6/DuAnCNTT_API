import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import { AUTH_CONSTANTS } from './constants';

dotenv.config();

const algorithm = 'aes-256-cbc';
const secretKey = crypto
  .createHash('sha256')
  .update(AUTH_CONSTANTS.SECRET_HASH_PASSWORD)
  .digest();
const ivLength = 16; // For AES, this is always 16

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
