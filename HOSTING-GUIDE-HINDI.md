# ₹17 Shared Hosting पर Website लगाने के चरण

## यह plan क्यों पर्याप्त है

- Website lightweight HTML/CSS/JavaScript और PHP इस्तेमाल करती है।
- MySQL database की आवश्यकता नहीं है।
- अधिकतम 50 students और 3 banners की सीमा panel में लगी है।
- Student work के अधिकतम 12 portfolio projects रखे जा सकते हैं।
- Upload की गई images अधिकतम 1400px WebP में optimize होती हैं, यदि hosting पर PHP GD उपलब्ध हो।
- Photo/video की अधिकतम upload सीमा 8 MB है।

## Upload कैसे करें

1. Hosting का cPanel खोलें।
2. **File Manager → public_html** खोलें।
3. `creative-edge-institute-hosting.zip` upload करें।
4. ZIP को `public_html` के अंदर Extract करें। सुनिश्चित करें कि `index.html` सीधे `public_html` में हो, किसी अतिरिक्त folder के अंदर नहीं।
5. अपना domain खोलकर website check करें।

## Admin panel पहली बार

1. Browser में `https://आपका-domain.com/admin.php` खोलें।
2. पहली बार कम से कम 8 characters का मजबूत password बनाएँ।
3. Login के बाद Website Details, Banner & Video और Placements बदलें।
4. Save दबाने पर changes सभी visitors के लिए publish होंगे।

## यदि Save/Upload काम न करे

cPanel File Manager में इन folders/files की permission check करें:

- `data` और `uploads`: सामान्यतः `755`
- `site-data.js`: सामान्यतः `644`; server write issue होने पर hosting support से PHP write permission enable करवाएँ।

## Storage बचाने के नियम

- Student photos JPG/WebP में रखें; upload से पहले 1 MB से छोटी रखना बेहतर है।
- छोटी MP4/WebM video रखें, अधिकतम 8 MB। बड़ी video YouTube पर upload करके embed करना बेहतर है।
- हर महीने पूरे `public_html` folder का ZIP backup download करें, क्योंकि plan में daily backup नहीं है।
