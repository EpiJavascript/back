
import * as crypto from 'crypto';

function hashPassword(str: string): string {
  return crypto.scryptSync(str, process.env.SALT_SECRET_KEY, 64).toString('hex');
}

export default hashPassword;
