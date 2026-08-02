const test = require('node:test');
const assert = require('node:assert/strict');
const { needsRestock, restockReport } = require('../src/inventory');

test('flags items well below par', () => {
  assert.equal(needsRestock({ sku: 'ETH-1', onHand: 2, parLevel: 24 }), true);
});

test('does not flag items near par', () => {
  assert.equal(needsRestock({ sku: 'COL-1', onHand: 20, parLevel: 24 }), false);
});

test('uncounted items are assumed at par', () => {
  assert.equal(needsRestock({ sku: 'GUA-1' }), false);
});

test('report is sorted scarcest first', () => {
  const report = restockReport([
    { sku: 'A', name: 'Altura', onHand: 5, parLevel: 24 },
    { sku: 'B', name: 'Bourbon', onHand: 1, parLevel: 24 },
  ]);
  assert.deepEqual(report.map((r) => r.sku), ['B', 'A']);
});
