const { calculateNumberOfPages, formatDate } = require('./EventCardService');
const { collection, getDocs } = require('firebase/firestore');
const { db } = require('./firebase');
const assert = require('assert');

// Mock Firebase Firestore
jest.mock('firebase/firestore');

describe('calculateNumberOfPages function', () => {
  test('calculates the number of pages correctly', async () => {
    const mockOutreachSnapshot = {
      size: 25, // Mocking the total count of outreaches
    };

    getDocs.mockResolvedValue(mockOutreachSnapshot); // Mock getDocs return value

    const outreachesPerPage = 5;
    const expectedNumberOfPages = 5; // 25 / 5 = 5

    const result = await calculateNumberOfPages(outreachesPerPage);

    assert.strictEqual(result, expectedNumberOfPages, 'Number of pages calculation is incorrect');
    expect(getDocs).toHaveBeenCalledWith(collection(db, 'outreachEvents'));
  });

  test('throws an error when outreaches per page is less than 1', async () => {
    const outreachesPerPage = 0;

    await assert.rejects(
      async () => {
        await calculateNumberOfPages(outreachesPerPage);
      },
      { message: 'The number of outreaches per page must be between 1 and 10.' }
    );
  });

  test('throws an error when outreaches per page is more than 10', async () => {
    const outreachesPerPage = 11;

    await assert.rejects(
      async () => {
        await calculateNumberOfPages(outreachesPerPage);
      },
      { message: 'The number of outreaches per page must be between 1 and 10.' }
    );
  });
});

describe('formatDate function', () => {
  test('correctly formats a known date', () => {
    const testDate = new Date(2024, 5, 25, 15, 30); // June 25, 2024 3:30 PM
    const expected = 'Jun 25, 2024 TUE 3:30 PM';
    const result = formatDate(testDate);
    assert.strictEqual(result, expected, `Expected ${expected}, but got ${result}`);
  });

  test('handles AM/PM correctly', () => {
    const testDate = new Date(2024, 11, 1, 0, 5); // Dec 1, 2024 12:05 AM
    const expected = 'Dec 1, 2024 SUN 12:05 AM';
    const result = formatDate(testDate);
    assert.strictEqual(result, expected, `Expected ${expected}, but got ${result}`);
  });

  test('correctly formats single-digit minutes', () => {
    const testDate = new Date(2024, 0, 1, 9, 5); // Jan 1, 2024 9:05 AM
    const expected = 'Jan 1, 2024 MON 9:05 AM';
    const result = formatDate(testDate);
    assert.strictEqual(result, expected, `Expected ${expected}, but got ${result}`);
  });
});
