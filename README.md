# Mouthfuls

A simple static landing page that collects waitlist emails.

## Setup

1. Create a free form at [Formspree](https://formspree.io) (or any service that accepts a JSON `POST` with an `email` field).
2. Paste the endpoint URL into `WAITLIST_ENDPOINT` at the top of `script.js`.
3. Deploy the folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

Submissions show up in your Formspree dashboard, where you can export them as CSV.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
