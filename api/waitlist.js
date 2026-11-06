// Vercel serverless function: POST /api/waitlist
// Saves the signup as a Resend contact and sends the confirmation email.
// Needs RESEND_API_KEY (Full access) in Vercel → Settings → Environment Variables.

const FROM = "Mouthfuls <hello@playmouthfuls.com>";
const SEND_CONFIRMATION = true;

// Where the landing page is hosted — the email loads its images from here.
const SITE_URL = "https://www.playmouthfuls.com"; // email images load from here
const TIKTOK_URL = "https://www.tiktok.com/@your-handle";
const INSTAGRAM_URL = "https://www.instagram.com/your-handle";
const CONTACT_EMAIL = "hello@playmouthfuls.com";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method_not_allowed" });

  const params = req.body || {};
  if (params._gotcha) return res.json({ ok: true }); // bot

  const email = String(params.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }

  try {
    const existing = await resend("GET", "/contacts/" + encodeURIComponent(email));
    if (existing.ok) return res.json({ ok: true, duplicate: true });

    const created = await resend("POST", "/contacts", { email, unsubscribed: false });
    if (!created.ok) {
      const detail = await created.text();
      console.error("contact " + created.status + ": " + detail);
      // TEMP DEBUG — remove after diagnosing. Surfaces the Resend status/message (no secrets) so we can see why signup fails.
      return res.status(500).json({ ok: false, error: "signup_failed", resend_status: created.status, resend_detail: detail.slice(0, 300) });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "signup_failed" });
  }

  if (SEND_CONFIRMATION) {
    // Don't fail the signup if the email can't be sent (e.g. daily quota hit).
    const sent = await sendConfirmation(email).catch((err) => err);
    if (!sent || !sent.ok) console.error("confirmation email failed", sent && sent.status, sent && (await sent.text?.()));
  }

  return res.json({ ok: true });
}

export function sendConfirmation(to, subject = "You're on the Mouthfuls waitlist!") {
  return resend("POST", "/emails", {
    from: FROM,
    to,
    reply_to: CONTACT_EMAIL,
    subject,
    html: confirmationHtml(),
    text:
      "You're on the list!\n\nWe're so glad you're here! Thanks for joining the Mouthfuls waitlist. " +
      "We'll let you know the moment we launch in early 2027.\n\n" +
      "TikTok: " + TIKTOK_URL + "\nInstagram: " + INSTAGRAM_URL + "\n\n— The Mouthfuls team",
  });
}

function resend(method, path, body) {
  return fetch("https://api.resend.com" + path, {
    method,
    headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });
}

function confirmationHtml() {
  const img = (name) => SITE_URL + "/assets/" + name;
  const display = "DynaPuff, 'Arial Rounded MT Bold', Helvetica, Arial, sans-serif";
  const text = "Figtree, Helvetica, Arial, sans-serif";
  const pill = (href, label) =>
    '<a href="' + href + '" style="font-family:' + display + ';font-weight:700;font-size:17px;text-decoration:none;' +
    'color:#FFF3EA;background:#6E1221;padding:14px 28px;border-radius:999px;display:inline-block;margin:0 6px;">' + label + "</a>";

  return (
    '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@700&family=Figtree:wght@400;700&display=swap" rel="stylesheet"></head>' +
    '<body style="margin:0;padding:0;background:#FFF3EA;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF3EA;"><tr><td align="center">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFF3EA;color:#6E1221;font-family:' + text + ';">' +

    // Header
    '<tr><td align="center" style="background:#85C2FF;padding:40px 40px 0;">' +
    '<img src="' + img("logo.png") + '" width="300" alt="Mouthfuls" style="display:block;width:300px;max-width:100%;height:auto;border:0;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;"><tr>' +
    '<td width="30%" align="left" valign="bottom" style="padding-bottom:24px;"><img src="' + img("food-5.png") + '" width="96" alt="" style="display:block;width:96px;height:auto;border:0;"></td>' +
    '<td width="40%" align="center" valign="bottom"><img src="' + img("icon-8.png") + '" width="160" alt="" style="display:block;width:160px;height:auto;border:0;"></td>' +
    '<td width="30%" align="right" valign="bottom" style="padding-bottom:28px;"><img src="' + img("food-1.png") + '" width="84" alt="" style="display:block;width:84px;height:auto;border:0;"></td>' +
    "</tr></table></td></tr>" +

    // Body
    '<tr><td align="center" style="padding:56px 48px 40px;text-align:center;">' +
    '<h1 style="margin:0 0 24px;font-family:' + display + ';font-weight:700;font-size:44px;line-height:1.05;color:#6E1221;">You’re on the list!</h1>' +
    '<p style="margin:0 0 28px;font-size:18px;line-height:1.6;color:#6E1221;">We’re so glad you’re here! Thanks for joining the Mouthfuls waitlist. We’ll let you know the moment we launch in early 2027.</p>' +
    '<table role="presentation" cellpadding="0" cellspacing="0" style="background:#F9ED03;border:3px solid #6E1221;border-radius:24px;"><tr><td style="padding:24px 32px;text-align:center;">' +
    '<div style="font-family:' + display + ';font-weight:700;font-size:22px;line-height:1.1;margin-bottom:10px;color:#6E1221;">What we’re building</div>' +
    '<div style="font-size:16px;line-height:1.55;color:#6E1221;">A card-based game made to play during meals (and snacks!). Mix and match cards based on what’s on your plate, your kids’ texture preferences or sensory needs, and the games you want to play.</div>' +
    "</td></tr></table>" +
    '<p style="margin:32px 0 20px;font-size:18px;line-height:1.6;color:#6E1221;">We’re two moms building this in our (not-so-spare) time. Come follow along.</p>' +
    pill(TIKTOK_URL, "TikTok") + pill(INSTAGRAM_URL, "Instagram") +
    "</td></tr>" +

    // Food row
    '<tr><td align="center" style="padding:8px 32px 40px;">' +
    ["food-3.png:70", "food-2.png:70", "food-6.png:80", "food-4.png:62", "food-7.png:112"]
      .map((s) => {
        const [n, w] = s.split(":");
        return '<img src="' + img(n) + '" width="' + w + '" alt="" style="display:inline-block;width:' + w + 'px;height:auto;border:0;margin:0 6px;vertical-align:middle;">';
      })
      .join("") +
    "</td></tr>" +

    // Footer
    '<tr><td align="center" style="background:#6E1221;padding:36px 48px;text-align:center;">' +
    '<img src="' + img("mark.png") + '" width="44" alt="" style="display:block;width:44px;height:auto;border:0;margin:0 auto 14px;">' +
    '<p style="margin:0;font-size:13px;line-height:1.6;color:#FFF3EA;">You’re getting this because you joined the Mouthfuls waitlist. Questions? Just reply to this email or write to ' +
    '<a href="mailto:' + CONTACT_EMAIL + '" style="color:#FF98DD;">' + CONTACT_EMAIL + "</a>.</p>" +
    "</td></tr>" +

    "</table></td></tr></table></body></html>"
  );
}
