#!/usr/bin/env bash
set -euo pipefail

fail() { echo "✗ $1" >&2; exit 1; }
ok() { echo "✓ $1"; }

command -v git >/dev/null || fail "git is required"
ok "git $(git --version | awk '{print $3}')"

command -v node >/dev/null || fail "Node 18+ is required (https://nodejs.org)"
major=$(node -p 'process.versions.node.split(".")[0]')
[ "$major" -ge 18 ] || fail "Node >= 18 required, found $(node --version)"
ok "node $(node --version)"

if command -v claude >/dev/null; then
  ok "claude CLI found"
else
  echo "⚠ claude CLI not found — install it: https://claude.com/claude-code" >&2
fi

if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
  perm=$(gh repo view "$(git remote get-url origin 2>/dev/null)" \
    --json viewerPermission -q .viewerPermission 2>/dev/null || echo "NONE")
  case "$perm" in
    ADMIN|MAINTAIN|WRITE)
      ok "gh authenticated with push access — agents will open real PRs" ;;
    *)
      echo "⚠ gh is authenticated but you can't push to this repo — agents stop at local branches."
      echo "  Want real PRs in your own fork? Run:  gh repo fork --remote"
      ;;
  esac
else
  echo "⚠ gh not authenticated — agents will stop at local branches (fine for the exercise)"
fi

echo
echo "Running the test suite (should be green — the seeded bugs are uncovered):"
npm test

echo
echo "You're set. Start Claude Code here and run:"
echo "  /parallel-ship issues/01-bulk-discount-boundary.md issues/03-restock-report-zero-stock.md"
