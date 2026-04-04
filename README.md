# Lavanda

Next.js-витрина для магазина лаванды с публичным сайтом, формами заявок и MVP-админкой.

## Что уже есть

- Публичная витрина с каталогом, карточками, контактами и секциями бренда.
- Серверный API: `POST /api/inquiries` для заявок и сообщений.
- Интеграция с Telegram Bot API через env-переменные.
- Единый контент-слой в [`lib/site-content.ts`](/Users/danila/Desktop/lavanda/lib/site-content.ts).
- Контент-панель в [`app/admin/page.tsx`](/Users/danila/Desktop/lavanda/app/admin/page.tsx) для подготовки структуры каталога и экспорта JSON.

## Быстрый старт

```bash
npm install
npm run dev
```

Открыть:

- сайт: `http://localhost:3000`
- админка: `http://localhost:3000/admin`

## Настройка Telegram

Создайте `.env.local` на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполните:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

После этого формы с сайта начнут отправлять уведомления в Telegram.

## Деплой

Подходит для Vercel, Netlify или Cloudflare при условии, что переменные окружения заданы в панели проекта.

Минимум для деплоя:

1. Импортировать репозиторий в хостинг.
2. Указать команду сборки `npm run build`.
3. Указать команду запуска `npm start` если платформа требует.
4. Прописать `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

## Важное ограничение

Текущая `/admin` это не полноценная CMS: она редактирует контент в памяти браузера и экспортирует JSON. Для настоящей прод-админки с авторизацией, CRUD и сохранением между сессиями нужен внешний backend-слой:

- Supabase
- Firebase
- Sanity

Самый рациональный следующий шаг для этого проекта: подключить Supabase Auth + Postgres + Storage и перевести `site-content` из локального seed-файла в таблицы.
