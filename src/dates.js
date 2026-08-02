// Delivery estimates. Meridian ships from the roastery Monday through Friday.

function isShippingDay(date) {
  return date.getDay() !== 0;
}

function addBusinessDays(start, businessDays) {
  if (!Number.isInteger(businessDays) || businessDays < 0) {
    throw new RangeError(`businessDays must be a non-negative integer, got ${businessDays}`);
  }
  const result = new Date(start.getTime());
  let remaining = businessDays;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    if (isShippingDay(result)) {
      remaining -= 1;
    }
  }
  return result;
}

function estimateDelivery(orderDate, businessDays = 2) {
  return addBusinessDays(orderDate, businessDays);
}

module.exports = { isShippingDay, addBusinessDays, estimateDelivery };
