---
description: Commit and push changes to deploy (publishes to mouthfuls.vercel.app)
---

Publish the user's changes to the live site. Explain each step in plain English, no jargon.

1. **Check for changes.** Run `git status`. If nothing has changed, tell the user there's nothing to publish and stop.

2. **Sanity-check the site.** This is a static site, so there is no build step to run. Instead, make sure the page isn't obviously broken: confirm `index.html` still opens and the files you changed are valid (no half-finished edits, no broken HTML/CSS/JS). If something looks broken, explain it in plain English, fix it if the fix is obvious, and re-check. **Never publish a broken page.**

3. **Safety check for secrets and private data.** Stage the relevant files (never `git add -A`/`.` blindly), then run `git diff --cached` and read it carefully. Do **NOT** commit if any staged content looks like:
   - an API key or secret — long random strings, or anything starting with `sk_`, `pk_live`, `AKIA`, `ghp_`, `re_`, etc.
   - a `.env` file of any kind
   - a list of email addresses or other customer data
   If you find any of these, do not commit. Explain in plain English what you found and how to fix it (e.g. "move the key into Vercel → Settings → Environment Variables and reference it with `process.env`"), then stop.

4. **Commit and push.** Write a short, plain-English commit message describing the change, then commit and run `git push origin main`.

5. **Confirm.** Tell the user it's pushed and that the live site at https://mouthfuls.vercel.app updates automatically in about a minute.

**Never force-push or rewrite history.**
