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

test('an order of exactly 10 bags gets the 10% tier (issue 01)', () => {
  const order = priceOrder(10);
  assert.equal(order.discountPercent, 10);
  assert.equal(order.totalCents, 10 * 1850 - Math.round(10 * 1850 * 0.10));
});

test('an order of exactly 25 bags gets the 20% tier, not 10% (issue 01)', () => {
  const order = priceOrder(25);
  assert.equal(order.discountPercent, 20);
  assert.equal(order.totalCents, 25 * 1850 - Math.round(25 * 1850 * 0.20));
});
