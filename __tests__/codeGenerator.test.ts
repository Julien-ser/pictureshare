import { generateEventCode, isValidEventCode } from '../src/utils/codeGenerator';

describe('codeGenerator', () => {
  describe('generateEventCode', () => {
    it('should generate a code with correct format (3 letters + 3 digits)', async () => {
      const code = await generateEventCode();
      expect(code).toMatch(/^[A-Z]{3}\d{3}$/);
    });

    it('should generate unique codes on multiple calls', async () => {
      const codes = new Set<string>();
      for (let i = 0; i < 100; i++) {
        const code = await generateEventCode();
        expect(codes.has(code)).toBe(false);
        codes.add(code);
      }
    });

    it('should validate generated codes with isValidEventCode', async () => {
      const code = await generateEventCode();
      expect(isValidEventCode(code)).toBe(true);
    });

    it('should retry when checkUnique returns false', async () => {
      let callCount = 0;
      const checkUnique = jest.fn(async (code: string) => {
        callCount++;
        // First 3 calls return false, then true
        return callCount > 3;
     });
   });

      const code = await generateEventCode(checkUnique);
      expect(code).toMatch(/^[A-Z]{3}\d{3}$/);
      expect(callCount).toBeGreaterThan(1);
    });

    it('should throw error after max attempts', async () => {
      const checkUnique = jest.fn(async () => false);

      await expect(generateEventCode(checkUnique)).rejects.toThrow(
        'Failed to generate unique event code after 10 attempts'
      );
    });

    it('should stop retrying when checkUnique is not provided', async () => {
      const code = await generateEventCode();
      expect(code).toMatch(/^[A-Z]{3}\d{3}$/);
    });
  });

  describe('isValidEventCode', () => {
    it('should return true for valid codes', () => {
      expect(isValidEventCode('ABC123')).toBe(true);
      expect(isValidEventCode('XYZ999')).toBe(true);
      expect(isValidEventCode('DEF000')).toBe(true);
    });

    it('should return false for lowercase letters', () => {
      expect(isValidEventCode('abc123')).toBe(false);
      expect(isValidEventCode('AbC123')).toBe(false);
    });

    it('should return false for codes with less than 6 characters', () => {
      expect(isValidEventCode('AB12')).toBe(false);
      expect(isValidEventCode('ABC1')).toBe(false);
    });

    it('should return false for codes with more than 6 characters', () => {
      expect(isValidEventCode('ABCD123')).toBe(false);
      expect(isValidEventCode('ABC1234')).toBe(false);
    });

    it('should return false for codes with special characters', () => {
      expect(isValidEventCode('AB-123')).toBe(false);
      expect(isValidEventCode('ABC 123')).toBe(false);
    });

    it('should return false for codes with letters in digit part', () => {
      expect(isValidEventCode('ABC1D3')).toBe(false);
      expect(isValidEventCode('AB12CD')).toBe(false);
    });

    it('should return false for codes with digits in letter part', () => {
      expect(isValidEventCode('A1C123')).toBe(false);
      expect(isValidEventCode('1BC123')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isValidEventCode('')).toBe(false);
    });

    it('should return false for null or undefined', () => {
      // @ts-expect-error testing with invalid input
      expect(isValidEventCode(null)).toBe(false);
      // @ts-expect-error testing with invalid input
      expect(isValidEventCode(undefined)).toBe(false);
    });
  });
});
