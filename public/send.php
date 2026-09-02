<?php
// Приём заявки с сайта и отправка в Telegram.
// Конфиг с токеном лежит ВЫШЕ корня сайта: /var/www/<user>/data/config.php
//   <?php return ['token' => '...', 'chat_id' => '...'];

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['ok' => false, 'error' => 'method not allowed']));
}

$configPath = __DIR__ . '/../config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    exit(json_encode(['ok' => false, 'error' => 'server is not configured']));
}
$cfg = require $configPath;

$in = json_decode(file_get_contents('php://input'), true) ?: $_POST;

// honeypot: скрытое поле, которое заполняют только боты
if (!empty($in['website'])) {
    exit(json_encode(['ok' => true]));
}

$type      = ($in['type'] ?? '') === 'order' ? 'order' : 'contact';
$name      = trim(mb_substr((string)($in['customerName'] ?? ''), 0, 100));
$phone     = trim(mb_substr((string)($in['phone'] ?? ''), 0, 30));
$messenger = in_array($in['messenger'] ?? '', ['telegram', 'viber'], true) ? $in['messenger'] : '';
$product   = trim(mb_substr((string)($in['productName'] ?? ''), 0, 200));
$comment   = trim(mb_substr((string)($in['comment'] ?? ''), 0, 2000));

if (mb_strlen($name) < 2 || mb_strlen($phone) < 7 || $messenger === '') {
    http_response_code(400);
    exit(json_encode(['ok' => false, 'error' => 'Некорректные данные формы.']));
}

$lines = [
    $type === 'order' ? 'Новая заявка на товар' : 'Новое сообщение с сайта',
    '',
    "Имя: {$name}",
    "Телефон: {$phone}",
    "Мессенджер: {$messenger}",
];
if ($product !== '') {
    $lines[] = "Товар: {$product}";
}
if ($comment !== '') {
    $lines[] = "Комментарий: {$comment}";
}

$ch = curl_init("https://api.telegram.org/bot{$cfg['token']}/sendMessage");
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_POSTFIELDS     => http_build_query([
        'chat_id' => $cfg['chat_id'],
        'text'    => implode("\n", $lines),
    ]),
]);
curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($code !== 200) {
    http_response_code(502);
    exit(json_encode(['ok' => false, 'error' => 'Не удалось отправить заявку.']));
}

echo json_encode(['ok' => true]);
