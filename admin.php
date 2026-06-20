<?php
declare(strict_types=1);
session_start();
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');

$configDir = __DIR__ . '/private';
$passwordFile = $configDir . '/admin-password.php';
$error = '';

if (!is_dir($configDir)) { @mkdir($configDir, 0755, true); }

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: admin.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = (string)($_POST['password'] ?? '');
    if (!file_exists($passwordFile)) {
        $confirm = (string)($_POST['confirm_password'] ?? '');
        if (strlen($password) < 8) {
            $error = 'Password कम से कम 8 characters का रखें।';
        } elseif ($password !== $confirm) {
            $error = 'दोनों passwords match नहीं हुए।';
        } else {
            $content = "<?php\nreturn " . var_export(password_hash($password, PASSWORD_DEFAULT), true) . ";\n";
            if (@file_put_contents($passwordFile, $content, LOCK_EX) === false) {
                $error = 'Password file नहीं बन सकी। Hosting में folder write permission check करें।';
            } else {
                $_SESSION['mosaic_admin'] = true;
                header('Location: admin.php');
                exit;
            }
        }
    } else {
        $hash = require $passwordFile;
        if (password_verify($password, $hash)) {
            session_regenerate_id(true);
            $_SESSION['mosaic_admin'] = true;
            header('Location: admin.php');
            exit;
        }
        $error = 'Password गलत है।';
    }
}

if (!($_SESSION['mosaic_admin'] ?? false)) {
    $isSetup = !file_exists($passwordFile);
    ?><!doctype html><html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title><?= $isSetup ? 'Admin Setup' : 'Admin Login' ?> — Mosaic Works</title><style>body{margin:0;background:#171817;color:#171817;font-family:Arial,sans-serif;min-height:100vh;display:grid;place-items:center}.box{width:min(390px,calc(100% - 40px));background:#f3f1ea;padding:34px;box-sizing:border-box}.logo{color:#382080;font-weight:800;font-size:21px;letter-spacing:.08em}.box h1{margin:35px 0 8px;font-size:29px}.box p{font-size:13px;color:#666;line-height:1.6}.box label{display:block;font-size:11px;font-weight:700;margin-top:18px}.box input{width:100%;box-sizing:border-box;padding:13px;margin-top:7px;border:1px solid #ccc;background:white}.box button{width:100%;border:0;background:#c9ff39;padding:14px;font-weight:800;margin-top:22px;cursor:pointer}.error{background:#ffe1df;color:#9b211a;padding:10px;font-size:12px}</style></head><body><form class="box" method="post"><div class="logo">MOSAIC WORKS · INSTITUTE</div><h1><?= $isSetup ? 'Admin बनाएँ' : 'Admin Login' ?></h1><p><?= $isSetup ? 'पहली बार अपना secure password बनाएँ। इसे सुरक्षित जगह लिख लें।' : 'Website manage करने के लिए password डालें।' ?></p><?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?><label>Password<input type="password" name="password" required minlength="8" autocomplete="<?= $isSetup ? 'new-password' : 'current-password' ?>"></label><?php if ($isSetup): ?><label>Password दोबारा<input type="password" name="confirm_password" required minlength="8" autocomplete="new-password"></label><?php endif; ?><button type="submit"><?= $isSetup ? 'Admin Setup करें' : 'Login करें' ?></button></form></body></html><?php
    exit;
}

readfile(__DIR__ . '/admin.html');
