const test = require('node:test');
const assert = require('node:assert/strict');
const { priceOrder } = require('../src/pricing');

test('small orders pay full price', () => {
  const order = priceOrder(5);
  assert.equal(order.discountPercent, 0);
  assert.equal(order.totalCents, 5 * 1850);
});

test('mid-size orders get the 10% tier', () => {
  const order = priceOrder(12);
  assert.equal(order.discountPercent, 10);
  assert.equal(order.totalCents, 12 * 1850 - Math.round(12 * 1850 * 0.10));
});

test('large orders get the 20% tier', () => {
  const order = priceOrder(30);
  assert.equal(order.discountPercent, 20);
});

test('rejects non-positive and fractional bag counts', () => {
  assert.throws(() => priceOrder(0), RangeError);
  assert.throws(() => priceOrder(2.5), RangeError);
});
