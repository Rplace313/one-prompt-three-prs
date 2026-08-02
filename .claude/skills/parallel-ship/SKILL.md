---
name: parallel-ship
description: Fix multiple independent bug reports in parallel — one fresh git worktree and one subagent per issue, each shipping a test-verified branch or PR. Use when asked to fix several issues at once, e.g. "/parallel-ship issues/01-foo.md issues/02-bar.md".
---

# Parallel Ship

Turn N independent issue reports into N test-verified branches (or PRs),
worked simultaneously, without the diffs ever touching each other.

## Arguments

Issue file paths (e.g. `issues/01-bulk-discount-boundary.md`). With no
arguments, use every file in `issues/`.

## Preflight (once, before any fan-out)

1. Confirm the working tree is clean (`git status`). Stop and report if not.
2. If a remote exists, `git fetch origin` and use `origin/main` as the base;
   otherwise use local `main`.
3. Decide PR mode: if `gh auth status` succeeds AND the user has push access
   to `origin`, agents open PRs. Otherwise agents stop at a local branch —
   that is success, not failure. State which mode is active before fanning out.
4. Derive per issue: a slug (file name minus number and extension), branch
   `fix/<slug>`, and a worktree directory as an ABSOLUTE sibling path of the
   repo: `../wt-<slug>`.

## Fan-out

Dispatch ALL subagents in a single message so they run concurrently. Each
subagent gets its own worktree and this contract:

1. Create the worktree: `git worktree add <absolute-sibling-dir> -b fix/<slug> <base>`.
   Never reuse an existing worktree; never switch branches inside one.
2. Work ONLY inside that worktree directory.
3. Read the issue file. Find the root cause and record it as file:line.
4. Write a regression test that reproduces the reported behavior. Run it and
   capture the FAILING output. If you cannot make it fail, report that
   instead of "fixing" anything — a fix without a failing test is a guess.
5. Apply the smallest fix that makes it pass, following the repo's CLAUDE.md
   conventions.
6. Run the full test suite.
7. Commit test + fix together, message referencing the issue file.
8. PR mode: push the branch and `gh pr create`, putting the failing/passing
   evidence in the PR body. Branch mode: stop after the commit.
9. Return a structured report: issue, root cause (file:line), test added,
   files touched, failing output (before), passing output (after), full-suite
   result, PR URL or branch name.

## Collate (after all agents return)

Present ONE evidence table:

| issue | root cause | test added | files touched | suite | PR/branch |

Then flag, by name:

- any agent that never showed a failing test,
- any fix touching more files than the repo convention allows,
- any full-suite failure.

## Cleanup (only after the user merges)

`git worktree remove ../wt-<slug>` per worktree, then `git worktree prune`.
Never delete a worktree with uncommitted changes without asking.
