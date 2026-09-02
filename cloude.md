# Лавандовая ферма — контекст проекта и деплоя

Файл для продолжения работы в Claude Code. Содержит состояние проекта, принятые
решения и оставшиеся задачи. Обновляй по мере выполнения.

---

## Проект

Сайт КФХ «Лавандовая ферма» (Беларусь). Продажа сухоцветов / лаванды.

**Стек (проверено по коду 02.09.2026 — раньше был описан неверно):**
- **Next.js** (App Router, сгенерирован в v0) — НЕ React+Vite и НЕ статическая SPA
- 6 серверных API-роутов: `app/api/{inquiries,site-content,admin/*}` —
  заявки, чтение/запись контента, логин/логаут/аплоад админки
- Админка серверная: auth через `ADMIN_LOGIN`/`ADMIN_PASSWORD` + `middleware.ts`
- Supabase: сервер ходит с **service-role ключом** (`lib/site-content-store.ts`),
  anon-ключа в бандле нет вообще
- Telegram: токен только на сервере (`lib/notifications.ts`, env без `NEXT_PUBLIC_`) —
  в бандл не попадает, перевыпуск не нужен
- Изображения: в `public/` только `viber.svg`. Дефолтный контент
  (`lib/site-content.ts`) захардкожен на Vercel Blob
  (`hebbkx1anhila5yf.public.blob.vercel-storage.com` — хранилище v0, умрёт/зависит
  от Vercel). Загрузки из админки — Supabase Storage, бакет `site-assets`

**Supabase:**
- Проект `pljuigenbqtovmxncdbo`, регион `eu-west-1` (West EU, Ireland)
- План Free, compute `t4g.nano`
- Организация `kulick23's Org` (личная организация разработчика — при сдаче
  работы проект нужно перенести заказчику либо отказаться от Supabase)

**Текущий деплой:** Vercel. Переезжаем на белорусский хостинг — см. ниже.

---

## Почему переезжаем с Vercel

Заказчик — белорусское юрлицо (КФХ), сайт используется для продаж на территории РБ.

- **Указ №60 от 01.02.2010**: деятельность по реализации товаров и услуг на
  территории Беларуси ведётся через ресурсы национального сегмента, размещённые
  на территории РБ.
- **Регистрация в БелГИЭ** (госреестр информационных сетей, систем и ресурсов,
  Постановление Совмина №644): заявление подаёт хостинг-провайдер, у которого
  размещён ресурс. Vercel этого сделать не может — путь к регистрации закрыт
  в принципе, а не «пока не оформили».
- **Персональные данные** (Закон №99-З): база в Ирландии — это ЕС, участник
  Конвенции 108, трансграничная передача законна без разрешения НЦЗПД. Менять
  регион Supabase не требуется.

Итоговое решение: **фронт на белорусский виртуальный хостинг, Supabase остаётся
в Ирландии.** VPS с self-hosted Supabase не нужен — избыточно и в 20 раз дороже.

> ✅ **Решено и сделано (02.09.2026): переделан под статик-экспорт.**
> `output: 'export'` + `trailingSlash` в `next.config.mjs`, сборка в `out/`.
> - Серверные роуты, `middleware.ts`, `lib/admin-auth.ts`, `lib/notifications.ts`,
>   `@vercel/analytics` — удалены
> - Контент: сайт читает Supabase с клиента (anon-ключ, RLS public read),
>   при недоступности — дефолт из `lib/site-content.ts`
> - Админка: UI не тронут; логин через **Supabase Auth** (email+пароль),
>   запись контента и загрузка картинок напрямую в Supabase под RLS
> - Форма заказа: три формы шлют на `/send.php` (лежит в `public/`,
>   попадает в `out/` при сборке; токен — в `config.php` выше корня сайта)
> - Дефолтные картинки скачаны с Vercel Blob в `public/images/`, ссылки заменены
> - `.htaccess` тоже в `public/` — уезжает в сборку автоматически
>
> **Чтобы всё заработало, осталось настроить Supabase — см. «Настройка Supabase
> под новую схему» ниже.**

---

## Инфраструктура

**Провайдер:** hoster.by (он же hb.by), тариф виртуального хостинга Unix.

**Домены** (все зарегистрированы на заказчика, 02.09.2026):
- `lavandabel.by` — **основной**, на нём работает сайт
- `lavandabel.site`, `lavandabel.online`, `lavandabel.xyz` — 301-редирект на основной
  (не открывать сайт на всех четырёх — дубли контента убивают SEO)

**DNS:** `ns1.hoster.by`, `ns2.hoster.by`

**Хостинг:**
- Панель ISPmanager: `https://vh134.hoster.by:1500/`
- Пользователь: `h216118`
- SSH / FTP: `vh134.hoster.by`, SSH порт 22
- Корень сайта: примерно `/var/www/h216118/data/www/lavandabel.by/`
  (точный путь — в свойствах WWW-домена в панели)

> Пароль от панели, присланный в письме активации, **скомпрометирован**
> (пересылался открытым текстом). Должен быть сменён. В этот файл пароли и
> токены не записывать.

---

## Чеклист задач

### Инфраструктура
- [ ] Сменить пароль панели ISPmanager
- [ ] Проверить NS у всех четырёх доменов → `ns1.hoster.by` / `ns2.hoster.by`
- [ ] Проверить, что администратор домена `lavandabel.by` — КФХ, а не физлицо
- [ ] Создать WWW-домен `lavandabel.by` + псевдоним `www.lavandabel.by`
- [ ] Залить сборку, положить `.htaccess`
- [ ] Выпустить Let's Encrypt, включить принудительный редирект на https
- [ ] Настроить 301-редиректы с `.site` / `.online` / `.xyz`
- [ ] Убрать домен из проекта Vercel, деплой удалить
- [ ] Подать заявку на регистрацию в БелГИЭ через кабинет hoster.by

### Безопасность (сделать до публикации)
- [x] ~~Убрать токен Telegram-бота из фронтенда~~ — токен теперь только
      в `config.php` на хостинге, из кода Next удалён вовсе
- [x] Убрана строка `lavandashop2026` из `.env.example` (была закоммичена в git;
      старая парольная админка удалена целиком, но если этот пароль
      использовался ещё где-то — сменить)
- [x] `.env` и `out/` добавлены в `.gitignore`
- [x] RLS на `site_content` + политики Storage включены и проверены 02.09.2026:
      anon читает / не пишет, authenticated пишет, загрузка в Storage работает.
      Нюанс: в новых версиях Storage `upsert: true` требует доп. политик
      (select/delete) — из кода загрузки upsert убран, файлы и так уникальные
- [x] Самостоятельная регистрация в Supabase Auth отключена (проверено:
      signup возвращает «Signups not allowed»), учётка админа создана
- [ ] Проверить остальные таблицы: включённый RLS с политикой `using (true)`
      для `anon` на запись — дыра, Advisor о ней не сообщит

### Supabase
- [ ] `Authentication → URL Configuration`: `Site URL` и `Redirect URLs`
      → `https://lavandabel.by`
- [ ] Анти-пауза: проект на Free засыпает после 7 дней без запросов к БД
- [ ] Бэкапы: на Free их нет вообще
- [ ] `supabase db pull` — вытащить схему в миграции (сейчас `No migrations`)

### Юридическое (зона ответственности заказчика)
- [ ] Включение в Торговый реестр РБ через исполком
- [ ] Приказ об ответственном за обработку персональных данных, политика обработки
- [ ] Явное согласие на обработку ПД в форме заказа (галочка, не пред-отмеченная),
      с упоминанием передачи заявки в мессенджер
- [ ] Обязательные сведения на сайте: наименование, УНП, юр. адрес, режим работы,
      контакты, условия оплаты / доставки / возврата, дата регистрации в Торговом реестре

---

## Настройка Supabase под новую схему (сделать один раз)

Порядок важен: сначала политики, потом можно публиковать.

**1. RLS + политики на `site_content`** (SQL Editor, одной транзакцией):

```sql
alter table public.site_content enable row level security;

create policy "public read site_content"
on public.site_content for select
to anon, authenticated
using (true);

create policy "admin write site_content"
on public.site_content for all
to authenticated
using (true)
with check (true);
```

**2. Storage — бакет `site-assets`:**
- Создать бакет, если нет, и пометить его **Public** (иначе публичные URL
  картинок не будут открываться)
- Политики на запись для админки:

```sql
create policy "admin upload site assets"
on storage.objects for insert
to authenticated
with check (bucket_id = 'site-assets');

create policy "admin update site assets"
on storage.objects for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');
```

**3. Учётка админа:** `Authentication → Users → Add user` — email + пароль,
поставить галку auto-confirm. Этими данными заказчик входит в `/admin/`.

**4. ⚠️ Запретить самостоятельную регистрацию:**
`Authentication → Sign In / Up → отключить "Allow new users to sign up"`.
Политики выше дают право записи ЛЮБОМУ authenticated-пользователю — если
регистрация открыта, кто угодно создаст учётку и перепишет сайт.

**5. Переменные сборки** (локально `.env`, в CI — секреты):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
Без них сборка проходит, но сайт будет показывать только дефолтный контент
и админка не заработает.

---

## Готовые сниппеты

### Конфиг Telegram для `send.php`

`send.php` уже в репозитории (`public/send.php`, при сборке попадает в `out/`).
На хостинге нужно один раз положить конфиг **выше корня сайта**, чтобы он не
отдавался по HTTP:

`/var/www/h216118/data/config.php` (корень сайта — на уровень ниже):

```php
<?php
return [
  'token'   => 'ТОКЕН_БОТА',
  'chat_id' => 'ID_ЧАТА',
];
```

### Ручной деплой

```bash
pnpm build
rsync -avz --delete out/ h216118@vh134.hoster.by:/var/www/h216118/data/www/lavandabel.by/
```

Слэш после `out/` обязателен — иначе папка зальётся внутрь себя.
`.htaccess` и `send.php` едут вместе со сборкой, исключать ничего не нужно.

### GitHub Action — деплой по пушу в `main`

Секреты репозитория: `SSH_HOST`, `SSH_USER`, `SSH_KEY` (приватный ключ),
`DEPLOY_PATH`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      - name: Deploy over SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts
          rsync -avz --delete \
            out/ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}
```

### Анти-пауза и бэкап Supabase (Free)

`.github/workflows/supabase-keepalive.yml`:

```yaml
name: Supabase keepalive
on:
  schedule:
    - cron: '0 6 */3 * *'   # раз в 3 дня
  workflow_dispatch:

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping REST
        run: |
          curl -sS -f \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            "${{ secrets.SUPABASE_URL }}/rest/v1/site_content?select=id&limit=1"
```

`.github/workflows/supabase-backup.yml`:

```yaml
name: Supabase backup
on:
  schedule:
    - cron: '0 3 * * *'
  workflow_dispatch:

jobs:
  dump:
    runs-on: ubuntu-latest
    steps:
      - uses: supabase/setup-cli@v1
      - name: Dump
        run: |
          supabase db dump --db-url "${{ secrets.SUPABASE_DB_URL }}" -f schema.sql
          supabase db dump --db-url "${{ secrets.SUPABASE_DB_URL }}" -f data.sql --use-copy --data-only
      - uses: actions/upload-artifact@v4
        with:
          name: supabase-backup-${{ github.run_id }}
          path: '*.sql'
          retention-days: 30
```

---

## Открытые вопросы

1. ~~Где лежат изображения~~ — дефолтные скачаны с Vercel Blob в
   `public/images/`, ссылки в `lib/site-content.ts` заменены. Осталось:
   посмотреть в проде (строка `main` таблицы `site_content`) — если контент
   правили через админку, там могут остаться старые blob-ссылки; заменить
   их через админку до удаления деплоя Vercel.
2. ~~Как отправляется заявка в Telegram~~ — теперь через `/send.php`.
3. ~~Как деплоить Next.js~~ — решено: статик-экспорт, переделка выполнена
   (см. блок ✅ выше).
4. Судьба Supabase после сдачи: перенести проект в организацию заказчика,
   либо переписать админку на MySQL хостинга и убрать Supabase совсем
   (тогда исчезают пауза, лимиты и внешняя зависимость).

---

## Справочные цены

- Виртуальный хостинг Unix Старт — от 5,5 BYN/мес (10 ГБ NVMe, 1 сайт, SSL бесплатно)
- Домен `.by` — ~33 BYN/год
- Госпошлина за регистрацию в БелГИЭ — 0,5 базовой величины
- Supabase Pro (если упрёмся в лимиты Free) — $25/мес

## Источники по законодательству

- Указ №60 от 01.02.2010 — размещение ресурсов в национальном сегменте
- Постановление Совмина №644 от 29.04.2010 — госрегистрация в БелГИЭ
- Закон №99-З от 07.05.2021 — защита персональных данных
- https://www.belgie.by/ru/ap/ap_u/4_2/ — процедура регистрации ресурса
- https://cpd.by/ — НЦЗПД, трансграничная передача

> Не юридическая консультация. Пункты по Торговому реестру и ПД заказчику
> стоит проверить у юриста.