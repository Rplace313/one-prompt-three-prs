// Wholesale pricing for Meridian Coffee Roasters.
// Price sheet promises: 10+ bags -> 10% off, 25+ bags -> 20% off.

const PRICE_PER_BAG_CENTS = 1850;

const DISCOUNT_TIERS = [
  { minBags: 25, percent: 20 },
  { minBags: 10, percent: 10 },
];

function discountPercentFor(bagCount) {
  for (const tier of DISCOUNT_TIERS) {
    if (bagCount >= tier.minBags) {
      return tier.percent;
    }
  }
  return 0;
}

function priceOrder(bagCount) {
  if (!Number.isInteger(bagCount) || bagCount < 1) {
    throw new RangeError(`bagCount must be a positive integer, got ${bagCount}`);
  }
  const subtotalCents = bagCount * PRICE_PER_BAG_CENTS;
  const discountPercent = discountPercentFor(bagCount);
  const discountCents = Math.round((subtotalCents * discountPercent) / 100);
  return {
    bagCount,
    subtotalCents,
    discountPercent,
    discountCents,
    totalCents: subtotalCents - discountCents,
  };
}

module.exports = { PRICE_PER_BAG_CENTS, discountPercentFor, priceOrder };
