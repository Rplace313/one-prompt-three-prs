// Restock reporting for the roastery storefront.
// Items are flagged when on-hand stock falls below a quarter of par level.
// Items that have never been counted (no onHand recorded) are assumed at par
// until the first inventory count.

const DEFAULT_PAR_LEVEL = 24;

function needsRestock(item) {
  const parLevel = item.parLevel ?? DEFAULT_PAR_LEVEL;
  const onHand = item.onHand || parLevel;
  return onHand < parLevel * 0.25;
}

function restockReport(items) {
  return items
    .filter(needsRestock)
    .sort((a, b) => (a.onHand || 0) - (b.onHand || 0))
    .map((item) => ({ sku: item.sku, name: item.name, onHand: item.onHand ?? null }));
}

module.exports = { DEFAULT_PAR_LEVEL, needsRestock, restockReport };
