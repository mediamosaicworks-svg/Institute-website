# GitHub Pages पर blank/default page ठीक करें

Repository के सबसे ऊपर सीधे ये files दिखनी चाहिए:

- `index.html`
- `styles.css`
- `script.js`
- `site-data.js`
- `assets` folder
- `.nojekyll`

`index.html` किसी ZIP या `creative-edge-institute` नाम के अंदरूनी folder में नहीं होनी चाहिए। GitHub ZIP को अपने-आप extract नहीं करता।

## सही तरीका

1. GitHub repository खोलें।
2. अगर website files अंदरूनी folder में हैं, repository root में दोबारा upload करें।
3. **Add file → Upload files** चुनें।
4. अपने computer पर `creative-edge-institute` folder खोलें और उसके **अंदर की files/folders** upload box में डालें। ZIP file न डालें।
5. **Commit changes** दबाएँ।
6. **Settings → Pages → Build and deployment** में `Deploy from a branch`, branch `main`, folder `/(root)` चुनें।
7. Save करके 2–5 मिनट प्रतीक्षा करें और फिर `Ctrl + F5` से refresh करें।

नोट: GitHub Pages पर PHP admin backend नहीं चलेगा। Public website चलेगी; server-wide admin saving/uploads के लिए PHP shared hosting चाहिए।
