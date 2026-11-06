# Mouthfuls — working notes for Claude

This is the landing page for **Mouthfuls**, a card game. It's a plain static website — just `index.html`, `styles.css`, `script.js`, and an `assets/` folder of images and fonts (there's no React, no Next.js, and no build step). **This repository is PUBLIC**, so anything committed here can be seen by anyone on the internet. The people editing this repo are **non-technical** and will describe the changes they want in plain English — your job is to make those changes safely and explain what you did in plain English too.

## Rules

- **Never write API keys, secrets, passwords, or tokens into any file.** If a change needs a secret, tell the user to add it in the Vercel dashboard under **Settings → Environment Variables**, and reference it in code via `process.env` (for example, `process.env.RESEND_API_KEY`).
- **Never add customer data to the repo** — no emails, names, addresses, or orders. This repo is public.
- **Only edit `index.html`, `styles.css`, `script.js`, and files under `assets/`** unless you're explicitly asked to touch something else. Do **not** change anything under `api/` or `.claude/`, or `launch.json`, without being asked. (This project has no `package.json`, `next.config.*`, or `vercel.json` — if one ever gets added, don't change it unless asked.)
- **Before any change, confirm in one sentence what you're about to do.** After the change, say what changed in plain English — no jargon.
- **Never force-push, rewrite history, or delete branches.**

## How to work here

Two commands handle the whole workflow — type them into Claude Code:

- **`/preview`** — Starts a local copy of the site on your computer and opens it in your browser so you can see your changes before they go live. The preview server keeps running until you stop it (press `Ctrl+C`). Nothing you see in preview is public yet.
- **`/publish`** — Puts your changes on the live site at **https://www.playmouthfuls.com**. It double-checks that nothing secret or private is about to be published, saves your changes, and pushes them. The live site updates about a minute later.

A typical session: describe the change you want → Claude makes it → run `/preview` to check it → run `/publish` to make it live.
