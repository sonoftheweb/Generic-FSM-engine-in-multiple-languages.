import { modThree } from '../../src/modules/modThree/modThree';

describe('modThree FSM Implementation', () => {
  // Test cases from the problem description
  test('should return 1 for binary "1101" (13)', () => {
    expect(modThree('1101')).toBe(1);
  });

  test('should return 2 for binary "1110" (14)', () => {
    expect(modThree('1110')).toBe(2);
  });

  test('should return 0 for binary "1111" (15)', () => {
    expect(modThree('1111')).toBe(0);
  });

  // Edge cases
  test('should return 0 for an empty string "" (0)', () => {
    expect(modThree('')).toBe(0);
  });

  test('should return 0 for binary "0" (0)', () => {
    expect(modThree('0')).toBe(0);
  });

  test('should return 1 for binary "1" (1)', () => {
    expect(modThree('1')).toBe(1);
  });

  // Additional test cases for robustness
  const testCases = [
    { binary: '10', decimal: 2, expected: 2 },
    { binary: '11', decimal: 3, expected: 0 },
    { binary: '100', decimal: 4, expected: 1 },
    { binary: '101', decimal: 5, expected: 2 },
    { binary: '110', decimal: 6, expected: 0 },
    { binary: '10000', decimal: 16, expected: 1 },
    { binary: '11111111', decimal: 255, expected: 0 }, // 255 is a multiple of 3
  ];

  testCases.forEach(({ binary, decimal, expected }) => {
    test(`should return ${expected} for binary "${binary}" (decimal ${decimal})`, () => {
      expect(modThree(binary)).toBe(expected);
    });
  });

  // Test for invalid characters (though the FSM engine handles this, it's good practice)
  test('should throw an error for input with invalid characters', () => {
    // The FSM engine will throw an error if a symbol is not in the alphabet.
    // The modThree function does not catch this, so the error should propagate.
    expect(() => modThree('10210')).toThrow();
  });
});