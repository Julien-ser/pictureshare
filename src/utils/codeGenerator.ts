/**
 * Generates a random 6-digit alphanumeric code
 * Format: 3 uppercase letters followed by 3 digits (e.g., ABC123)
 * Ensures uniqueness by checking Firestore if a callback is provided
 */
export async function generateEventCode(
  checkUnique?: (code: string) => Promise<boolean>
): Promise<string> {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  let code: string;
  let isUnique = true;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    // Generate 3 random letters
    let lettersPart = '';
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      lettersPart += letters[randomIndex];
    }

    // Generate 3 random digits
    let digitsPart = '';
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      digitsPart += digits[randomIndex];
    }

    code = lettersPart + digitsPart;
    attempts++;

    if (checkUnique) {
      isUnique = await checkUnique(code);
    } else {
      isUnique = true;
    }
  } while (!isUnique && attempts < maxAttempts);

  if (!isUnique) {
    throw new Error('Failed to generate unique event code after ' + maxAttempts + ' attempts');
  }

  return code;
}

/**
 * Validates that a code matches the required format (3 letters + 3 digits)
 */
export function isValidEventCode(code: string | null | undefined): boolean {
  if (typeof code !== 'string') {
    return false;
  }
  const regex = /^[A-Z]{3}\d{3}$/;
  return regex.test(code);
}
