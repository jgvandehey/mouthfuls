# Mouthfuls

A simple static landing page that collects waitlist emails into a Google Sheet and sends each signup a confirmation email. No backend or third-party form service needed.

## Setup

1. Create a new Google Sheet.
2. Open **Extensions → Apps Script**, replace the default code with the contents of `google-apps-script.gs`, and save.
3. Click **Deploy → New deployment**, choose type **Web app**, set *Execute as* to **Me** and *Who has access* to **Anyone**, then deploy and authorize.
4. Copy the web app URL (ends in `/exec`) into `WAITLIST_ENDPOINT` at the top of `script.js`.
5. Deploy this folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

Signups land in the **Waitlist** tab (created automatically) with a timestamp; duplicates are ignored.

### Confirmation emails

The script sends a confirmation from your Google account via `MailApp` (about 100/day on a free Gmail account, 1,500/day on Workspace). Edit the subject/body in `google-apps-script.gs`, or set `SEND_CONFIRMATION = false` to turn it off. If you change the script later, redeploy via **Deploy → Manage deployments → Edit → New version**.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
