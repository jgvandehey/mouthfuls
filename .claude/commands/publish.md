---
description: Commit and push changes to deploy (publishes to mouthfuls.vercel.app)
---

Publish the current changes:

1. Run `git status` and `git diff` to see what's changed.
2. If there's nothing to commit, say so and stop.
3. Stage the relevant files (never `git add -A`/`.` blindly — check for anything that shouldn't be committed, like secrets).
4. Write a concise commit message describing the change, following this repo's commit style (see `git log`), ending with:
   Co-Authored-By: Claude <noreply@anthropic.com>
5. Commit, then `git push origin main`.
6. Confirm the push succeeded and remind the user it will auto-deploy to https://mouthfuls.vercel.app.
