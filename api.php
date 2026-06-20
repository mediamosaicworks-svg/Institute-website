<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(array $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function requireAdmin(): void {
    if (!($_SESSION['mosaic_admin'] ?? false)) respond(['ok'=>false,'error'=>'Login required'], 401);
}

$action = (string)($_GET['action'] ?? '');
$dataDir = __DIR__ . '/data';
$uploadsDir = __DIR__ . '/uploads';
if (!is_dir($dataDir)) @mkdir($dataDir, 0755, true);
if (!is_dir($uploadsDir)) @mkdir($uploadsDir, 0755, true);

if ($action === 'save') {
    requireAdmin();
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['ok'=>false,'error'=>'POST required'], 405);
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 1000000) respond(['ok'=>false,'error'=>'Content too large'], 413);
    $data = json_decode($raw, true);
    if (!is_array($data) || !isset($data['settings'], $data['students'], $data['banners'])) respond(['ok'=>false,'error'=>'Invalid website data'], 422);
    $data['students'] = array_slice(array_values($data['students']), 0, 50);
    $data['banners'] = array_slice(array_values($data['banners']), 0, 3);
    $data['portfolio'] = array_slice(array_values(is_array($data['portfolio'] ?? null) ? $data['portfolio'] : []), 0, 12);
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false) respond(['ok'=>false,'error'=>'Could not encode data'], 500);
    $js = "window.ONLINE_SITE_DATA = " . $json . ";\n";
    if (@file_put_contents($dataDir . '/site.json', $json, LOCK_EX) === false || @file_put_contents(__DIR__ . '/site-data.js', $js, LOCK_EX) === false) respond(['ok'=>false,'error'=>'Server could not save. Check write permissions.'], 500);
    $website = rtrim((string)($data['settings']['website'] ?? ''), '/');
    if (filter_var($website, FILTER_VALIDATE_URL)) {
        $safeUrl = htmlspecialchars($website . '/', ENT_XML1 | ENT_QUOTES, 'UTF-8');
        $sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"><url><loc>{$safeUrl}</loc><lastmod>" . date('Y-m-d') . "</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>\n";
        @file_put_contents(__DIR__ . '/sitemap.xml', $sitemap, LOCK_EX);
        @file_put_contents(__DIR__ . '/robots.txt', "User-agent: *\nAllow: /\nDisallow: /private/\nDisallow: /data/\nSitemap: {$website}/sitemap.xml\n", LOCK_EX);
    }
    respond(['ok'=>true]);
}

if ($action === 'upload') {
    requireAdmin();
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES['file'])) respond(['ok'=>false,'error'=>'File required'], 400);
    $file = $_FILES['file'];
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) respond(['ok'=>false,'error'=>'Upload failed'], 400);
    if (($file['size'] ?? 0) > 8 * 1024 * 1024) respond(['ok'=>false,'error'=>'File 8 MB से छोटी रखें'], 413);
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    $allowed = ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif','video/mp4'=>'mp4','video/webm'=>'webm'];
    if (!isset($allowed[$mime])) respond(['ok'=>false,'error'=>'Only JPG, PNG, WebP, GIF, MP4 or WebM allowed'], 415);
    $isImage = strpos($mime, 'image/') === 0;
    $name = bin2hex(random_bytes(12)) . '.' . $allowed[$mime];
    if ($isImage && function_exists('imagecreatefromstring') && function_exists('imagewebp')) {
        $source = @imagecreatefromstring((string)file_get_contents($file['tmp_name']));
        if ($source !== false) {
            $width = imagesx($source); $height = imagesy($source); $max = 1400;
            $scale = min(1, $max / max($width, $height));
            $newWidth = max(1, (int)round($width * $scale)); $newHeight = max(1, (int)round($height * $scale));
            $canvas = imagecreatetruecolor($newWidth, $newHeight);
            imagealphablending($canvas, false); imagesavealpha($canvas, true);
            imagecopyresampled($canvas, $source, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            $name = bin2hex(random_bytes(12)) . '.webp';
            $saved = imagewebp($canvas, $uploadsDir . '/' . $name, 78);
            imagedestroy($canvas); imagedestroy($source);
            if (!$saved) respond(['ok'=>false,'error'=>'Could not optimize image'], 500);
        } elseif (!move_uploaded_file($file['tmp_name'], $uploadsDir . '/' . $name)) respond(['ok'=>false,'error'=>'Could not store upload'], 500);
    } elseif (!move_uploaded_file($file['tmp_name'], $uploadsDir . '/' . $name)) respond(['ok'=>false,'error'=>'Could not store upload'], 500);
    respond(['ok'=>true,'url'=>'uploads/'.$name,'type'=>strpos($mime,'video/')===0?'video':'image']);
}

respond(['ok'=>false,'error'=>'Unknown action'], 404);
