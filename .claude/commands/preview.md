---
description: Start a local server to preview the site
---

Start the local dev server and open the site so the user can check their changes.

1. Check if something is already serving on port 8000 (`lsof -i :8000`). If so, reuse it and skip to step 3.
2. Otherwise start the dev server **in the background** from the project root: `python3 -m http.server 8000`. Wait until it prints that it's serving (the local URL, http://localhost:8000).
3. Run `open http://localhost:8000` so the site opens in the user's browser.
4. If the Chrome extension is connected, also open http://localhost:8000 in Chrome and take screenshots at desktop width and at **390px** wide (phone size). Look at both and tell the user in plain English if anything looks broken or out of place in either.
5. Remind the user that the preview server keeps running until they press **Ctrl+C**, and that nothing in preview is public yet.
