# Mouthfuls

Static waitlist landing page for Mouthfuls, hosted on Vercel. Signups are saved as contacts in [Resend](https://resend.com) and each person gets a branded confirmation email from hello@playmouthfuls.com.

```
index.html              page markup (hero, about, card game, waitlist, follow, popup)
styles.css              styles + tablet/phone breakpoints
script.js               popup + waitlist form submission
api/waitlist.js         Vercel function: saves the signup to Resend + sends the confirmation email
assets/                 images and self-hosted fonts (DynaPuff, Figtree — SIL OFL)
```

## Deploying

Every push to `main` deploys automatically to https://mouthfuls.vercel.app (and playmouthfuls.com).

`api/waitlist.js` needs `RESEND_API_KEY` (a **Full access** Resend key) set in Vercel → Settings → Environment Variables. For local testing, put the same line in `.env.local` (git-ignored).

## Waitlist

- Signups appear in Resend → **Audience → Contacts**. Duplicates are ignored and don't get a second email.
- To email everyone at launch, use Resend → **Broadcasts**.
- The sending address, social links and contact email are at the top of `api/waitlist.js`. Set `SEND_CONFIRMATION = false` to stop confirmation emails.
- `playmouthfuls.com` DNS is managed at DreamHost; Resend's DNS records live there too.

### Placeholders to replace

- Social links and contact email in the footer of `index.html`.
- The same values at the top of `api/waitlist.js`.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
