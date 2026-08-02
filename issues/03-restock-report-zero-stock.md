# Sold-out items never show up on the restock report

**Reported by:** roastery ops
**Severity:** We keep running out without noticing

The morning restock report flags anything under a quarter of par level. But
items that are completely sold out — zero on hand — never appear on the
report at all. The Guatemala Antigua has been out for three days; inventory
shows it with 0 on hand, and the report stays empty.

An item with 1 bag left gets flagged fine. It's specifically the sold-out
(zero) items that vanish.

**Expected:** an item with 0 on hand is the most urgent line on the report.
**Actual:** 0-on-hand items are treated as fully stocked and skipped.
