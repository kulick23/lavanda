# Lavanda

Next.js-витрина для магазина лаванды с публичным сайтом, формами заявок и закрытой админкой.

## Что уже есть

- Публичная витрина с каталогом, карточками, контактами и секциями бренда.
- Серверный API: `POST /api/inquiries` для заявок и сообщений.
- Интеграция с Telegram Bot API через env-переменные.
- Закрытая админка с логином в [`/admin/login`](/Users/danila/Desktop/lavanda/app/admin/login/page.tsx).
- Хранение контента в Supabase через серверные маршруты.
- Загрузка изображений в Supabase Storage из админки.

## Быстрый старт

```bash
pnpm install
pnpm dev
```

Открыть:

- сайт: `http://localhost:3000`
- логин админа: `http://localhost:3000/admin/login`
- админка: `http://localhost:3000/admin`

## Настройка окружения

Создайте `.env.local` на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполните:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `ADMIN_LOGIN`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_CONTENT_TABLE`
- `SUPABASE_STORAGE_BUCKET`

После этого:

- формы с сайта начнут отправлять уведомления в Telegram;
- вход в админку будет работать по логину и паролю;
- контент будет читаться из Supabase;
- картинки из админки будут загружаться в Supabase Storage.

## Что нужно создать в Supabase

1. Таблицу `site_content`:

```sql
create table if not exists public.site_content (
  slug text primary key,
  data jsonb not null
);
```

2. Публичный bucket `site-assets` в Storage.

3. Вставить стартовый контент:

```sql
insert into public.site_content (slug, data)
values ('main', '{}'::jsonb)
on conflict (slug) do nothing;
```

Если запись `main` пустая, сайт поднимется на дефолтном seed-контенте из [`lib/site-content.ts`](/Users/danila/Desktop/lavanda/lib/site-content.ts), а после первого сохранения из админки заполнит ее реальными данными.

## Деплой

Подходит для Vercel, Netlify или Cloudflare при условии, что переменные окружения заданы в панели проекта.

Минимум для деплоя:

1. Импортировать репозиторий в хостинг.
2. Указать команду сборки `pnpm build`.
3. Указать команду запуска `pnpm start` если платформа требует.
4. Прописать все переменные окружения из `.env.example`.
5. Создать таблицу `site_content` и bucket `site-assets` в Supabase.

## Важное замечание

Авторизация здесь реализована через логин/пароль из env и защищенную cookie-сессию. Это хороший практичный вариант для одного владельца сайта. Если дальше понадобятся несколько администраторов, роли и восстановление доступа, следующий шаг это перевод входа на полноценный Supabase Auth.
