const test = require('node:test');
const assert = require('node:assert/strict');
const { estimateDelivery, addBusinessDays } = require('../src/dates');

// 2026-08-03 is a Monday.
test('midweek orders ship two business days later', () => {
  const monday = new Date(2026, 7, 3);
  const delivery = estimateDelivery(monday, 2);
  assert.equal(delivery.getDay(), 3); // Wednesday
  assert.equal(delivery.getDate(), 5);
});

test('zero business days returns the same date', () => {
  const tuesday = new Date(2026, 7, 4);
  assert.equal(addBusinessDays(tuesday, 0).getDate(), 4);
});

test('rejects negative day counts', () => {
  assert.throws(() => addBusinessDays(new Date(2026, 7, 3), -1), RangeError);
});
