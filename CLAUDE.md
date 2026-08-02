# Meridian Coffee — CLAUDE.md

Node service for Meridian Coffee Roasters (wholesale pricing, delivery
estimates, inventory). Zero dependencies; tests use the built-in `node:test`
runner.

## Commands

- Run all tests: `npm test`
- Run one file: `node --test test/pricing.test.js`

## Bug-fix ritual (non-negotiable)

1. Reproduce first: write a regression test in `test/` that fails on the
   current code and captures the reported behavior.
2. Show the failing output before touching `src/`.
3. Make the smallest fix that turns the test green. No drive-by refactors.
4. Re-run the new test (pass), then the full suite.
5. Commit the test and the fix together; reference the issue file in the
   commit message.

## Conventions

- Branch names: `fix/<issue-slug>` (e.g. `fix/bulk-discount-boundary`).
- Money is integer cents; never floats.
- Tests construct dates with the local-time `new Date(year, monthIndex, day)`
  constructor to avoid timezone surprises.
- A fix should touch one file in `src/` and one file in `test/`. If you need
  more, stop and explain why before proceeding.
