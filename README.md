# One Prompt, Three PRs

Demo repo for the workshop **"One Prompt, Three PRs: Parallel Feature Work
with Git Worktrees + Claude Code."** It's a small Node service for a
fictional roastery — Meridian Coffee — with **three real bugs seeded in it**
and a Claude Code skill that fixes them in parallel.

You will run one prompt. Claude Code will:

1. create an isolated git worktree per bug,
2. dispatch a subagent into each,
3. make every agent prove the bug with a failing test before fixing it,
4. hand you back branches/PRs plus an evidence table.

## Prerequisites

- git 2.30+
- Node 18+ (`node --version`)
- [Claude Code](https://claude.com/claude-code) installed and logged in
- Optional: `gh` CLI authenticated — one extra command (below) turns local
  branches into real PRs in your own fork

## Setup (2 minutes)

```bash
git clone <this-repo> && cd one-prompt-three-prs
./setup.sh
```

`setup.sh` verifies your toolchain and runs the test suite — it should be
green. (Yes, green: the seeded bugs live in behavior the current tests don't
cover. That's the point.)

**Have `gh` logged in?** You can't push to this repo, so out of the box your
agents stop at local branches. One command upgrades them to real PRs — in
your own fork, never in the workshop repo:

```bash
gh repo fork --remote
```

That forks the repo under your account and points `origin` at the fork
(the original becomes `upstream`). The skill detects push access and
switches to PR mode automatically. Skipping this is fine — branch mode is a
designed outcome, not a failure.

## The exercise (attendees: two bugs)

Start Claude Code in the repo and paste:

```
/parallel-ship issues/01-bulk-discount-boundary.md issues/03-restock-report-zero-stock.md
```

While the agents run, look around:

- `git worktree list` — one worktree per bug, as siblings of this repo
- `ls ../wt-*` — each agent working in isolation
- `issues/` — the bug reports the agents are working from

When they return, review the evidence table, then inspect a diff:

```bash
git log --oneline main..fix/bulk-discount-boundary
git diff main...fix/bulk-discount-boundary
```

Merge one locally if you like: `git merge --no-ff fix/<slug>`, then re-run
`npm test`.

Cleanup: `git worktree remove ../wt-<slug>` for each, then
`git worktree prune`.

## Take it home

The whole trick is one file: `.claude/skills/parallel-ship/SKILL.md`.
Copy that directory into any repo's `.claude/skills/`, adapt the conventions
section of your own CLAUDE.md, and `/parallel-ship` your real backlog
tomorrow morning.

## The three bugs (no spoilers)

| Issue | Symptom |
|---|---|
| [01](issues/01-bulk-discount-boundary.md) | Exactly-at-threshold wholesale orders miss their discount |
| [02](issues/02-delivery-estimate-saturday.md) | Friday orders get an impossible Monday delivery estimate |
| [03](issues/03-restock-report-zero-stock.md) | Sold-out items never appear on the restock report |

Root causes are in `FACILITATOR.md` — don't peek until your agents report.
