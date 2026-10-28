---
description: Start a local server to preview the site
---

Start a local preview of this static site:

1. Check if something is already serving on port 8000 (`lsof -i :8000`); if so, just open http://localhost:8000.
2. Otherwise, start `python3 -m http.server 8000` from the project root as a background process.
3. Open http://localhost:8000 in the browser so the user can see the current state of the page.
